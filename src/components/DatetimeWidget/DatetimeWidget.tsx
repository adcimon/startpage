import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TimezoneSelect } from '../TimezoneSelect/TimezoneSelect';
import { useInterval } from '../../hooks/useInterval';
import { Utils } from '../../utils/utils';

export const DatetimeWidget: React.FC = (): JSX.Element => {
	const [time, setTime] = React.useState<string>('');
	const [date, setDate] = React.useState<string>('');
	const [timezone, setTimezone] = React.useState<string>('Europe/Madrid');

	useInterval(() => {
		update();
	}, 1 * 1000);

	React.useEffect(() => {
		update();
	}, [timezone]);

	const update = () => {
		const time: string = Utils.getTime(timezone);
		setTime(time);
		const date: string = Utils.getDate(timezone);
		setDate(date);
	};

	const handleChangeTimezone = (event: any, value: any) => {
		setTimezone(value);
	};

	const render = () => {
		const opacity: string = '0.8';
		return (
			<>
				<Stack
					sx={{
						alignItems: 'center',
						flexDirection: 'column',
						flexWrap: 'wrap',
						gap: '1rem',
						justifyContent: 'center',
					}}>
					<Stack
						sx={{
							alignItems: 'center',
							flexDirection: 'column',
							flexWrap: 'wrap',
							gap: '0.5rem',
							justifyContent: 'center',
						}}>
						<Typography
							variant='h2'
							sx={{
								opacity: opacity,
							}}>
							{time}
						</Typography>
						<Typography
							variant='h6'
							sx={{
								opacity: opacity,
							}}>
							{date}
						</Typography>
					</Stack>
					<TimezoneSelect
						value={timezone}
						onChange={handleChangeTimezone}
						disableClearable
						sx={{
							height: '30px',
							width: '200px',
						}}
					/>
				</Stack>
			</>
		);
	};

	return render();
};
