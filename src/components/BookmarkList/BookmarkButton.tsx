import * as React from 'react';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

interface IBookmarkButtonProps {
	icon?: string;
	background?: string;
	url?: string;
}

export const BookmarkButton: React.FC<IBookmarkButtonProps> = (props: IBookmarkButtonProps): JSX.Element => {
	const theme: Theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.down('md'));

	const render = () => {
		return (
			<>
				<Box
					sx={{
						background: props.background,
						borderRadius: '10px',
						height: responsive ? '80px' : '120px',
						transition: 'transform 0.3s ease-out',
						width: responsive ? '126px' : '176px',
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
							height={responsive ? '35px' : '50px'}
							width={responsive ? '35px' : '50px'}
						/>
					</Link>
				</Box>
			</>
		);
	};

	return render();
};
