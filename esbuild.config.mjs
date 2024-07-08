import fs from 'fs';
import path from 'path';
import * as esbuild from 'esbuild';
import * as ghpages from 'gh-pages';

const args = process.argv;
console.log('Args', args);

const PUBLIC_DIRECTORY = 'public';
const SOURCE_DIRECTORY = 'src';
const BUILD_DIRECTORY = 'dist';

const INDEX_FILE = 'index.tsx';
const OUTPUT_FILE = 'output.js';

const getArgument = (name) => {
	const index = process.argv.indexOf(`--${name}`);
	if (index === -1) {
		return undefined;
	}

	return process.argv[index + 1];
};

const emptyDirectory = async (directoryPath) => {
	const files = await fs.promises.readdir(directoryPath);

	for (const file of files) {
		const filePath = path.join(directoryPath, file);
		const stat = await fs.promises.stat(filePath);

		if (stat.isDirectory()) {
			await emptyDirectory(filePath);
			await fs.promises.rmdir(filePath);
		} else {
			await fs.promises.unlink(filePath);
		}
	}
};

const copyPublicPlugin = {
	name: 'copy-public',
	setup(build) {
		build.onEnd(() =>
			fs.cpSync(PUBLIC_DIRECTORY, BUILD_DIRECTORY, {
				dereference: true,
				errorOnExist: false,
				force: true,
				preserveTimestamps: true,
				recursive: true,
			}),
		);
	},
};

const start = async (port) => {
	const ctx = await esbuild.context({
		logLevel: 'debug',
		entryPoints: [`${SOURCE_DIRECTORY}/${INDEX_FILE}`],
		outfile: `${BUILD_DIRECTORY}/${OUTPUT_FILE}`,
		format: 'cjs',
		bundle: true,
		minify: false,
		sourcemap: true,
		plugins: [copyPublicPlugin],
		define: {
			LIVE_RELOAD: 'true',
		},
	});

	await ctx.watch();

	await ctx.serve({
		servedir: BUILD_DIRECTORY,
		port: port,
		onRequest: ({ remoteAddress, method, path, status, timeInMS }) => {
			console.info(remoteAddress, status, `${method} ${path} [${timeInMS}ms]`);
		},
	});
};

const build = async () => {
	await esbuild.build({
		logLevel: 'info',
		entryPoints: [`${SOURCE_DIRECTORY}/${INDEX_FILE}`],
		outfile: `${BUILD_DIRECTORY}/${OUTPUT_FILE}`,
		format: 'cjs',
		bundle: true,
		minify: true,
		sourcemap: true,
		plugins: [copyPublicPlugin],
		define: {
			LIVE_RELOAD: 'false',
		},
	});
};

const clean = async () => {
	try {
		await emptyDirectory(BUILD_DIRECTORY);
		console.log(`Build directory ${BUILD_DIRECTORY} has been cleaned`);
	} catch (error) {
		console.error(`Error cleaning build directory ${BUILD_DIRECTORY}:`, error);
	}
};

const publish = (repository, branch) => {
	ghpages.publish(
		BUILD_DIRECTORY,
		{
			repo: repository,
			branch: branch,
		},
		(error) => {
			if (error) {
				console.error(
					`Error publishing build directory ${BUILD_DIRECTORY} to publish repository ${repository}:${branch}:`,
					error,
				);
			} else {
				console.log(
					`Build directory ${BUILD_DIRECTORY} has been published to publish repository ${repository}:${branch}`,
				);
			}
		},
	);
};

if (args.includes('--start')) {
	const port = Number(getArgument('port')) || undefined;
	await start(port);
}

if (args.includes('--build')) {
	await build();
}

if (args.includes('--clean')) {
	await clean();
}

if (args.includes('--publish')) {
	const repository = getArgument('repository');
	const branch = getArgument('branch') ?? 'gh-pages';
	publish(repository, branch);
}
