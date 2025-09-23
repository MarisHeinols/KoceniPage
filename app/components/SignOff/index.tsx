import React, { useState } from 'react';
import styles from './SignOff.module.css';
import { Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const SignOff = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	return (
		<div className={styles.signOffContainer}>
			<h2>Apstiprinājums</h2>
			<div className={styles.signOffEntry}>
				<h2>Apstiprinu (Klients):</h2>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<TextField label="Paraksts" variant="outlined" />
				</Stack>
			</div>
			<div className={styles.signOffEntry}>
				<h2>Darbinieks: Vards Uzvards / </h2>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<TextField label="Paraksts" variant="outlined" />
				</Stack>
			</div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<DatePicker
						label="Datums"
						value={selectedDate}
						onChange={(newValue) => setSelectedDate(newValue)}
						slotProps={{ textField: { fullWidth: true } }}
					/>
				</Stack>
			</LocalizationProvider>
		</div>
	);
};

export default SignOff;
