import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './Form.module.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Form = () => {
	const [action, setAction] = useState('Pārbaude');
	const [meterType, setMeterType] = useState('Mehāniskais');
	const [installed, setInstalled] = useState<string[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setAction(newValue);
	};
	const handleMeterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMeterType(event.target.value);
	};
	const handleInstalledChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value, checked } = event.target;
		setInstalled((prev) =>
			checked ? [...prev, value] : prev.filter((item) => item !== value)
		);
	};

	return (
		<div className={styles.formContentContainer}>
			<h2>Skaitītāja nomaiņas/pārbaudes informācija</h2>
			<div className={styles.smallField}>
				<Tabs
					value={action}
					onChange={handleTabChange}
					aria-label="basic tabs example"
				>
					<Tab value="Pārbaude" label="Pārbaude" />
					<Tab value="Nomaiņa" label="Nomaiņa" />
				</Tabs>
			</div>
			<div className={styles.row}>
				<div className={styles.rowEntry}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField label="Radijums" variant="outlined" fullWidth />
					</Stack>

					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Iemesls"
							variant="outlined"
							multiline
							minRows={6}
							fullWidth
						/>
					</Stack>
					<h2>Detaļas:</h2>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Novietojums</FormLabel>
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel
									value="Horizontāli"
									control={<Radio />}
									label="Horizontāli"
								/>
								<FormControlLabel
									value="Vertikāli"
									control={<Radio />}
									label="Vertikāli"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Atrodas</FormLabel>
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel value="Ēka" control={<Radio />} label="Ēka" />
								<FormControlLabel value="Akā" control={<Radio />} label="Akā" />
							</RadioGroup>
						</FormControl>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Bez Kanalizācijas</FormLabel>
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel
									value="Apakšskaitājs"
									control={<Radio />}
									label="Apakšskaitājs"
								/>
								<FormControlLabel
									value="Neatkarīgais skaitītājs"
									control={<Radio />}
									label="Neatkarīgais skaitītājs"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Skaitītājs ir</FormLabel>
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel
									value="KKS Īpašums"
									control={<Radio />}
									label="KKS Īpašums"
								/>
								<FormControlLabel
									value="Klienta īpašums"
									control={<Radio />}
									label="Klienta īpašums"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Uzstādīts</FormLabel>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={installed.includes('Filtrs')}
											onChange={handleInstalledChange}
											value="Filtrs"
										/>
									}
									label="Filtrs"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={installed.includes('Pretvārsts')}
											onChange={handleInstalledChange}
											value="Pretvārsts"
										/>
									}
									label="Pretvārsts"
								/>
							</FormGroup>
						</FormControl>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Tips</FormLabel>
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel
									value="Komercskaitītājs"
									control={<Radio />}
									label="Komercskaitītājs"
								/>
								<FormControlLabel
									value="Neatkarīgais skaitītājs"
									control={<Radio />}
									label="Neatkarīgais skaitītājs"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
				</div>
				<div className={styles.rowEntry}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField label="Plomba Nr" variant="outlined" fullWidth />
						<TextField label="Marka" variant="outlined" fullWidth />
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField label="Diametrs" variant="outlined" fullWidth />
						<TextField label="Garums" variant="outlined" fullWidth />
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }}>
							<FormLabel component="legend">Skaitītāja tips</FormLabel>
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel
									value="Mehāniskais"
									control={<Radio />}
									label="Mehāniskais"
								/>
								<FormControlLabel
									value="Impulsa"
									control={<Radio />}
									label="Impulsa"
								/>
							</RadioGroup>
							<hr />
							<RadioGroup
								row
								value={meterType}
								onChange={handleMeterChange}
								name="meterType"
							>
								<FormControlLabel
									value="Magnētiskais"
									control={<Radio />}
									label="Magnētiskais"
								/>
								<FormControlLabel
									value="Ultraskaņas"
									control={<Radio />}
									label="Ultraskaņas"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Piezīmes"
							variant="outlined"
							multiline
							minRows={10}
							fullWidth
						/>
					</Stack>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
							<DatePicker
								label="Verificēts/Iegādāts"
								value={selectedDate}
								onChange={(newValue) => setSelectedDate(newValue)}
								slotProps={{ textField: { fullWidth: true } }}
							/>
						</Stack>
					</LocalizationProvider>
				</div>
			</div>
		</div>
	);
};

export default Form;
