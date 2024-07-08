import * as React from 'react';
import { ThemeManager } from './managers/ThemeManager/ThemeManager';
import { AppView } from './views/AppView/AppView';

export default function App() {
	return (
		<>
			<ThemeManager>
				<AppView />
			</ThemeManager>
		</>
	);
}
