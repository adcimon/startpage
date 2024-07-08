import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type SearchFieldProps = TextFieldProps & {
	onSearch?: (query: string) => void;
};

export const SearchField: React.FC<SearchFieldProps> = (props: SearchFieldProps): JSX.Element => {
	const [value, setValue] = React.useState<string>('');

	const handleChange = (event: any) => {
		setValue(event.target.value);
		props.onChange?.(event);
	};

	const handleKeyDown = (event: any) => {
		if (value === '') {
			return;
		}

		if (event.key === 'Enter') {
			props.onSearch?.(value);
		}
	};

	const handleClear = () => {
		setValue('');
	};

	const render = () => {
		return (
			<>
				<TextField
					inputRef={props.inputRef}
					placeholder={props.placeholder}
					value={value}
					onChange={handleChange}
					onFocus={props.onFocus}
					onKeyDown={handleKeyDown}
					helperText={props.helperText}
					disabled={props.disabled}
					required={props.required}
					autoFocus={props.autoFocus}
					fullWidth={props.fullWidth}
					margin={props.margin}
					variant='filled'
					hiddenLabel
					InputLabelProps={{ shrink: false }}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end'>
								{value !== '' && <IconButton onClick={handleClear}>{<CloseIcon />}</IconButton>}
							</InputAdornment>
						),
					}}
					sx={props.sx}
				/>
			</>
		);
	};

	return render();
};
