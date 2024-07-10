import * as React from 'react';
import Container from '@mui/material/Container';
import { BookmarkList } from '../../components/BookmarkList/BookmarkList';
import { DatetimeWidget } from '../../components/DatetimeWidget/DatetimeWidget';
import { SearchField } from '../../components/SearchField/SearchField';

export const AppView: React.FC = (): JSX.Element => {
	const searchUrl: string = 'https://www.google.com/search?q=';

	const handleSearch = (query: string) => {
		window.location.href = searchUrl + query;
	};

	const render = () => {
		return (
			<>
				<Container
					maxWidth='md'
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						gap: '3rem',
						height: '100%',
						justifyContent: 'center',
						paddingBottom: '3rem',
						paddingTop: '3rem',
					}}>
					<DatetimeWidget />
					<SearchField
						onSearch={handleSearch}
						autoFocus
						sx={{
							width: '70%',
						}}
					/>
					<BookmarkList />
				</Container>
			</>
		);
	};

	return render();
};
