import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TimezoneSelect } from '../TimezoneSelect/TimezoneSelect';
import { useInterval } from '../../hooks/useInterval';
import { Utils } from '../../utils/utils';

interface IDateWidgetState {
	time: string;
	date: string;
	timezone: string;
}

export const DatetimeWidget: React.FC = (): JSX.Element => {
	const [state, setState] = React.useState<IDateWidgetState>({
		time: '',
		date: '',
		timezone: 'Europe/Madrid',
	});

	useInterval(() => {
		update();
	}, 1 * 1000);

	React.useEffect(() => {
		update();
	}, [state.timezone]);

	const update = () => {
		const time: string = Utils.getTime(state.timezone);
		const date: string = Utils.getDate(state.timezone);
		setState({
			...state,
			time: time,
			date: date,
		});
	};

	const handleChangeTimezone = (event: any, value: any) => {
		setState({
			...state,
			timezone: value,
		});
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
							{state.time}
						</Typography>
						<Typography
							variant='h6'
							sx={{
								opacity: opacity,
							}}>
							{state.date}
						</Typography>
					</Stack>
					<TimezoneSelect
						value={state.timezone}
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
