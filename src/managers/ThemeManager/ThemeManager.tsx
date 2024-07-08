import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import Base from '../../themes/Base/theme';
import CustomLight from '../../themes/CustomLight/theme';
import CustomDark from '../../themes/CustomDark/theme';

export const ThemeManager: React.FC<any> = (props: any = {}): JSX.Element => {
	const [theme, setTheme] = React.useState<number>(2);

	const getTheme = () => {
		switch (theme) {
			case 0:
				return Base;
			case 1:
				return CustomLight;
			case 2:
				return CustomDark;
			default:
				return Base;
		}
	};

	const handleClickTheme = () => {
		setTheme((theme + 1) % 3);
	};

	const render = () => {
		return (
			<>
				<IconButton
					onClick={handleClickTheme}
					sx={{
						color: 'hsla(206, 89%, 77%, 1)',
						position: 'absolute',
						right: '1rem',
						top: '1rem',
					}}>
					<PaletteOutlinedIcon />
				</IconButton>
				<ThemeProvider theme={getTheme()}>
					<CssBaseline />
					{props.children}
				</ThemeProvider>
			</>
		);
	};

	return render();
};
