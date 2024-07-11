import * as React from 'react';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import { BookmarkButton } from '../../components/BookmarkList/BookmarkButton';
import { Bookmarks } from '../../data/bookmarks';

export const BookmarkList: React.FC = (): JSX.Element => {
	const theme: Theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.down('md'));

	const render = () => {
		return (
			<>
				<Stack
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: responsive ? '1rem' : '2rem',
						justifyContent: 'center',
					}}>
					{Bookmarks.map((bookmark: any, index: number) => {
						return (
							<BookmarkButton
								key={index}
								icon={bookmark.icon}
								background={bookmark.background}
								url={bookmark.url}
							/>
						);
					})}
				</Stack>
			</>
		);
	};

	return render();
};
