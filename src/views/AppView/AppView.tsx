import * as React from 'react';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { BookmarkList } from '../../components/BookmarkList/BookmarkList';
import { DatetimeWidget } from '../../components/DatetimeWidget/DatetimeWidget';
import { SearchField } from '../../components/SearchField/SearchField';

export const AppView: React.FC = (): JSX.Element => {
	const searchUrl: string = 'https://www.google.com/search?q=';

	const theme: Theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.down('md'));

	const handleSearch = (query: string) => {
		window.location.href = searchUrl + query;
	};

	const render = () => {
		return (
			<>
				<Container
					maxWidth='md'
					sx={{
						height: '100vh',
						overflowY: 'auto',
					}}>
					<Stack
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
							gap: '2rem',
							minHeight: '100%',
							justifyContent: 'center',
							paddingBottom: '3rem',
							paddingTop: '3rem',
						}}>
						<DatetimeWidget />
						<SearchField
							onSearch={handleSearch}
							autoFocus
							sx={{
								width: responsive ? '80%' : '70%',
							}}
						/>
						<BookmarkList />
					</Stack>
				</Container>
			</>
		);
	};

	return render();
};
