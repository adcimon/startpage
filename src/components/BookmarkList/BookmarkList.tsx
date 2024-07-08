import * as React from 'react';
import Stack from '@mui/material/Stack';
import { BookmarkButton } from '../../components/BookmarkList/BookmarkButton';
import { Bookmarks } from '../../data/bookmarks';

export const BookmarkList: React.FC = (): JSX.Element => {
	const render = () => {
		return (
			<>
				<Stack
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: '2rem',
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
