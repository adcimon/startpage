import {
	createTheme,
	filledInputClasses,
	inputLabelClasses,
	outlinedInputClasses,
	paperClasses,
	tableCellClasses,
} from '@mui/material';

// Used only to create transitions.
const muiTheme = createTheme();

export function createComponents(config: any) {
	const { palette } = config;

	return {
		MuiAvatar: {
			styleOverrides: {
				root: {
					fontSize: 14,
					fontWeight: 600,
					letterSpacing: 0,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '12px',
					textTransform: 'uppercase',
				},
				sizeSmall: {
					padding: '6px 16px',
				},
				sizeMedium: {
					padding: '8px 20px',
				},
				sizeLarge: {
					padding: '11px 24px',
				},
				textSizeSmall: {
					padding: '7px 12px',
				},
				textSizeMedium: {
					padding: '9px 16px',
				},
				textSizeLarge: {
					padding: '12px 16px',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 20,
					[`&.${paperClasses.elevation1}`]: {
						boxShadow: '0px 0px 22px 0px rgba(0, 0, 0, 0.2)',
					},
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '32px 24px',
					'&:last-child': {
						paddingBottom: '32px',
					},
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: 'h6',
				},
				subheaderTypographyProps: {
					variant: 'body2',
				},
			},
			styleOverrides: {
				root: {
					padding: '32px 24px 16px',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
					scrollbarWidth: 'thin',
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					overscrollBehavior: 'contain',
					width: '100%',
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					overscrollBehavior: 'contain',
					width: '100%',
				},
				'#__next': {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
				},
				'#nprogress': {
					pointerEvents: 'none',
				},
				'#nprogress .bar': {
					backgroundColor: palette.primary.main,
					height: 3,
					left: 0,
					position: 'fixed',
					top: 0,
					width: '100%',
					zIndex: 2000,
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: 14,
					fontWeight: 500,
					[`&.${inputLabelClasses.filled}`]: {
						transform: 'translate(12px, 18px) scale(1)',
					},
					[`&.${inputLabelClasses.shrink}`]: {
						[`&.${inputLabelClasses.standard}`]: {
							transform: 'translate(0, -1.5px) scale(0.85)',
						},
						[`&.${inputLabelClasses.filled}`]: {
							transform: 'translate(12px, 6px) scale(0.85)',
						},
						[`&.${inputLabelClasses.outlined}`]: {
							transform: 'translate(14px, -9px) scale(0.85)',
						},
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				input: {
					fontSize: 14,
					fontWeight: 500,
					lineHeight: '24px',
					'&::placeholder': {
						color: palette.text.secondary,
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					'&::placeholder': {
						color: palette.text.secondary,
						opacity: 1,
					},
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					borderRadius: 8,
					borderStyle: 'solid',
					borderWidth: 1,
					overflow: 'hidden',
					borderColor: palette.neutral.light,
					// transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
					'&:hover': {
						backgroundColor: 'transparent',
						borderColor: palette.primary.main,
					},
					'&:before': {
						display: 'none',
					},
					'&:after': {
						display: 'none',
					},
					[`&.${filledInputClasses.disabled}`]: {
						backgroundColor: 'transparent',
					},
					[`&.${filledInputClasses.focused}`]: {
						backgroundColor: 'transparent',
						borderColor: palette.primary.main,
						boxShadow: `${palette.primary.main} 0 0 0 2px`,
					},
					[`&.${filledInputClasses.error}`]: {
						borderColor: palette.error.main,
						boxShadow: `${palette.error.main} 0 0 0 2px`,
					},
				},
				input: {
					fontSize: 14,
					fontWeight: 500,
					lineHeight: '24px',
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					borderRadius: '6px',
					'&:hover': {
						backgroundColor: palette.primary.main,
						color: palette.primary.contrastText,
						'& .MuiTypography-root': {
							color: palette.primary.contrastText,
						},
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					borderRadius: 8,
					borderStyle: 'solid',
					borderWidth: 1,
					overflow: 'hidden',
					borderColor: palette.neutral.light,
					// transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
					'&:hover': {
						backgroundColor: 'transparent',
						borderColor: palette.primary.main,
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: 'transparent',
						},
					},
					'&:before': {
						display: 'none',
					},
					'&:after': {
						display: 'none',
					},
					[`&.${outlinedInputClasses.disabled}`]: {
						backgroundColor: 'transparent',
					},
					[`&.${outlinedInputClasses.focused}`]: {
						backgroundColor: 'transparent',
						borderColor: palette.primary.main,
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: palette.primary.main,
							boxShadow: `${palette.primary.main} 0 0 0 2px`,
						},
					},
					[`&.${outlinedInputClasses.error}`]: {
						borderColor: palette.error.main,
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: palette.error.main,
							boxShadow: `${palette.error.main} 0 0 0 2px`,
						},
					},
				},
				input: {
					fontSize: 14,
					fontWeight: 500,
					lineHeight: '24px',
				},
				notchedOutline: {
					borderColor: 'transparent',
					// transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					boxShadow: '0px 0px 22px 0px rgba(0, 0, 0, 0.24)',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					borderRadius: '12px',
					'&:hover': {
						backgroundColor: 'transparent',
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: palette.primary.main,
						},
					},
					[`& .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: palette.neutral.light,
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: 14,
					fontWeight: 500,
					lineHeight: 1.71,
					minWidth: 'auto',
					paddingLeft: 0,
					paddingRight: 0,
					textTransform: 'none',
					'& + &': {
						marginLeft: 24,
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottomColor: palette.divider,
					padding: '15px 16px',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					borderBottom: 'none',
					[`& .${tableCellClasses.root}`]: {
						borderBottom: 'none',
						backgroundColor: palette.neutral.light,
						fontSize: 12,
						fontWeight: 700,
						lineHeight: 1,
						letterSpacing: 0.5,
						textTransform: 'uppercase',
					},
					[`& .${tableCellClasses.paddingCheckbox}`]: {
						paddingTop: 4,
						paddingBottom: 4,
					},
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'filled',
			},
		},
	};
}
