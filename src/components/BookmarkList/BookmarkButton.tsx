import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

interface IBookmarkButtonProps {
	icon?: string;
	background?: string;
	url?: string;
}

export const BookmarkButton: React.FC<IBookmarkButtonProps> = (props: IBookmarkButtonProps): JSX.Element => {
	const render = () => {
		return (
			<>
				<Box
					sx={{
						background: props.background,
						borderRadius: '10px',
						height: '120px',
						transition: 'transform 0.3s ease-out',
						width: '176px',
						'&:hover': {
							cursor: 'pointer',
							transform: 'translateY(-3px) scale(1.1)',
						},
					}}>
					<Link
						href={props.url ?? window.location.href}
						target={props.url ? '_self' : '_blank'}
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							height: '100%',
							justifyContent: 'center',
							width: '100%',
						}}>
						<img
							src={props.icon}
							height='50px'
							width='50px'
						/>
					</Link>
				</Box>
			</>
		);
	};

	return render();
};
