import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import styles from '../Form.module.css';
import type {
	Details,
	OldMeeter,
	UtilityMeeter,
} from '~/pages/utilityMeeterPage';
import { veidsOptions } from '..';

interface ChangeFormProps {
	formData: Details;
	oldUtilityFormData: Details;
	oldId: string;
	updateDetailsField: <K extends keyof UtilityMeeter['details']>(
		key: K,
		value: UtilityMeeter['details'][K]
	) => void;

	updateOldMeeterDetailsField: <K extends keyof Details>(
		key: K,
		value: Details[K]
	) => void;

	updateOldMeeter: <K extends keyof OldMeeter>(
		key: K,
		value: OldMeeter[K]
	) => void;

	updateUtilityMeeter: <K extends keyof UtilityMeeter>(
		key: K,
		value: UtilityMeeter[K]
	) => void;
}

const ChangeForm = ({
	formData,
	oldUtilityFormData,
	oldId,
	updateDetailsField,
	updateOldMeeterDetailsField,
	updateOldMeeter,
	updateUtilityMeeter,
}: ChangeFormProps) => {
	const [isOldCompeleted, setIsOldCompleted] = useState(false);

	const options = ['Verifikācijas termiņa beigas', 'Cits'];

	const handleInstalledChangeOld = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value, checked } = event.target;
		const updatedInstalled = checked
			? [...oldUtilityFormData?.installed, value]
			: oldUtilityFormData?.installed.filter((item) => item !== value);
		updateOldMeeterDetailsField('installed', updatedInstalled);
	};

	const handleInstalledChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value, checked } = event.target;
		const updatedInstalled = checked
			? [...formData.installed, value]
			: formData.installed.filter((item) => item !== value);
		updateDetailsField('installed', updatedInstalled);
	};

	useEffect(() => {
		updateOldMeeterDetailsField('iemesls', options[0]);
	}, []);

	return (
		<>
			<h2 className={styles.headings}>Pašreizējā skaitītāja info</h2>
			<div
				className={styles.row}
				style={{
					opacity: !isOldCompeleted ? '1' : '0.5',
					pointerEvents: !isOldCompeleted ? 'auto' : 'none',
				}}
			>
				{/* LEFT SIDE */}
				<div className={styles.rowEntry}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Radijums"
							variant="outlined"
							type="number"
							required
							fullWidth
							value={oldUtilityFormData?.radijums || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('radijums', e.target.value)
							}
						/>
					</Stack>

					<FormControl sx={{ width: '100%' }}>
						<InputLabel id="reason">Iemesls</InputLabel>
						<Select
							labelId="reason"
							label="Iemesls"
							variant="outlined"
							required
							fullWidth
							value={oldUtilityFormData?.iemesls || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('iemesls', e.target.value)
							}
						>
							{options.map((opt) => (
								<MenuItem key={opt} value={opt}>
									{opt}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl sx={{ width: '100%' }}>
						<InputLabel id="veids-label">Veids</InputLabel>
						<Select
							labelId="veids-label"
							label="Veids"
							required
							fullWidth
							value={oldUtilityFormData?.veids || ''} // we store only codes like "k41"
							onChange={(e) =>
								updateOldMeeterDetailsField('veids', e.target.value)
							}
						>
							{Object.entries(veidsOptions).map(([code, label]) => (
								<MenuItem key={code} value={code}>
									{code} – {label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<h3 className={styles.smallHeading}>Detaļas:</h3>

					{/* Novietojums */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Novietojums</FormLabel>
							<RadioGroup
								row
								value={oldUtilityFormData?.novietojums}
								onChange={(e) =>
									updateOldMeeterDetailsField('novietojums', e.target.value)
								}
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

					{/* Atrodas */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Atrodas</FormLabel>
							<RadioGroup
								row
								value={oldUtilityFormData?.atrodas || ''}
								onChange={(e) =>
									updateOldMeeterDetailsField('atrodas', e.target.value)
								}
							>
								<FormControlLabel value="Ēkā" control={<Radio />} label="Ēkā" />
								<FormControlLabel value="Akā" control={<Radio />} label="Akā" />
							</RadioGroup>
						</FormControl>
					</Stack>

					{/* Uzstādīts */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Uzstādīts</FormLabel>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={oldUtilityFormData?.installed.includes('Filtrs')}
											onChange={handleInstalledChangeOld}
											value="Filtrs"
										/>
									}
									label="Filtrs"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={oldUtilityFormData?.installed.includes(
												'Pretvārsts'
											)}
											onChange={handleInstalledChangeOld}
											value="Pretvārsts"
										/>
									}
									label="Pretvārsts"
								/>
							</FormGroup>
						</FormControl>
					</Stack>

					{/* Tips */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Tips</FormLabel>
							<RadioGroup
								row
								value={oldUtilityFormData?.tips || ''}
								onChange={(e) =>
									updateOldMeeterDetailsField('tips', e.target.value)
								}
							>
								<FormControlLabel
									value="Mehāniskais"
									control={<Radio />}
									label="Mehāniskais"
								/>
								<FormControlLabel
									value="Ultraskaņas"
									control={<Radio />}
									label="Ultraskaņas"
								/>
								<FormControlLabel
									value="Impulsa"
									control={<Radio />}
									label="Impulsa"
								/>
								<FormControlLabel
									value="Magnētiskais"
									control={<Radio />}
									label="Magnētiskais"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
				</div>

				{/* RIGHT SIDE */}
				<div className={styles.rowEntry}>
					{/* Other fields like Plomba Nr, Marka, Diametrs, Garums etc. */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Plomba Nr"
							required
							variant="outlined"
							fullWidth
							value={oldUtilityFormData?.plombaNr || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('plombaNr', e.target.value)
							}
						/>
						<TextField
							label="Marka"
							variant="outlined"
							required
							fullWidth
							value={oldUtilityFormData?.marka || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('marka', e.target.value)
							}
						/>
					</Stack>

					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Diametrs"
							variant="outlined"
							fullWidth
							type="number"
							required
							value={oldUtilityFormData?.diametrs || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('diametrs', e.target.value)
							}
						/>
						<TextField
							label="Garums"
							variant="outlined"
							fullWidth
							required
							type="number"
							value={oldUtilityFormData?.garums || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('garums', e.target.value)
							}
						/>
					</Stack>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
							<DatePicker
								label="Verificēts līdz"
								value={oldUtilityFormData?.verifiedTillDate || null}
								disabled={true}
								slotProps={{ textField: { fullWidth: true } }}
							/>
						</Stack>
					</LocalizationProvider>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Piezīmes"
							variant="outlined"
							multiline
							minRows={6}
							fullWidth
							value={oldUtilityFormData?.piezimes || ''}
							onChange={(e) =>
								updateOldMeeterDetailsField('piezimes', e.target.value)
							}
						/>
					</Stack>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					variant="contained"
					onClick={() => {
						setIsOldCompleted(false);
					}}
				>
					Atpakaļ
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						setIsOldCompleted(true);
						updateOldMeeter('id', oldId);
					}}
				>
					Turpināt
				</Button>
			</div>

			<br></br>
			<h2 className={styles.headings}>Jaunā skaitītāja info</h2>
			<div
				className={styles.row}
				style={{
					opacity: isOldCompeleted ? '1' : '0.5',
					pointerEvents: isOldCompeleted ? 'auto' : 'none',
				}}
			>
				{/* LEFT SIDE */}
				<div className={styles.rowEntry}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Id"
							variant="outlined"
							required
							fullWidth
							value={formData.radijums}
							onChange={(e) => updateUtilityMeeter('id', e.target.value)}
						/>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Radijums"
							variant="outlined"
							type="number"
							required
							fullWidth
							value={formData.radijums}
							onChange={(e) => updateDetailsField('radijums', e.target.value)}
						/>
					</Stack>

					<FormControl sx={{ width: '100%' }}>
						<InputLabel id="veids-label">Veids</InputLabel>
						<Select
							labelId="veids-label"
							label="Veids"
							required
							fullWidth
							value={formData.veids || ''} // we store only codes like "k41"
							onChange={(e) => updateDetailsField('veids', e.target.value)}
						>
							{Object.entries(veidsOptions).map(([code, label]) => (
								<MenuItem key={code} value={code}>
									{code} – {label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<h3 className={styles.smallHeading}>Detaļas:</h3>

					{/* Novietojums */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Novietojums</FormLabel>
							<RadioGroup
								row
								value={formData.novietojums}
								onChange={(e) =>
									updateDetailsField('novietojums', e.target.value)
								}
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

					{/* Atrodas */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Atrodas</FormLabel>
							<RadioGroup
								row
								value={formData.atrodas}
								onChange={(e) => updateDetailsField('atrodas', e.target.value)}
							>
								<FormControlLabel value="Ēkā" control={<Radio />} label="Ēkā" />
								<FormControlLabel value="Akā" control={<Radio />} label="Akā" />
							</RadioGroup>
						</FormControl>
					</Stack>

					{/* Uzstādīts */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Uzstādīts</FormLabel>
							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={formData.installed.includes('Filtrs')}
											onChange={handleInstalledChange}
											value="Filtrs"
										/>
									}
									label="Filtrs"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={formData.installed.includes('Pretvārsts')}
											onChange={handleInstalledChange}
											value="Pretvārsts"
										/>
									}
									label="Pretvārsts"
								/>
							</FormGroup>
						</FormControl>
					</Stack>

					{/* Tips */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<FormControl component="fieldset" sx={{ flex: 1 }} required>
							<FormLabel component="legend">Tips</FormLabel>
							<RadioGroup
								row
								value={formData.tips}
								onChange={(e) => updateDetailsField('tips', e.target.value)}
							>
								<FormControlLabel
									value="Mehāniskais"
									control={<Radio />}
									label="Mehāniskais"
								/>
								<FormControlLabel
									value="Ultraskaņas"
									control={<Radio />}
									label="Ultraskaņas"
								/>
								<FormControlLabel
									value="Impulsa"
									control={<Radio />}
									label="Impulsa"
								/>
								<FormControlLabel
									value="Magnētiskais"
									control={<Radio />}
									label="Magnētiskais"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
				</div>

				{/* RIGHT SIDE */}
				<div className={styles.rowEntry}>
					{/* Other fields like Plomba Nr, Marka, Diametrs, Garums etc. */}
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Plomba Nr"
							required
							variant="outlined"
							fullWidth
							value={formData.plombaNr}
							onChange={(e) => updateDetailsField('plombaNr', e.target.value)}
						/>
						<TextField
							label="Marka"
							variant="outlined"
							required
							fullWidth
							value={formData.marka}
							onChange={(e) => updateDetailsField('marka', e.target.value)}
						/>
					</Stack>

					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Diametrs"
							variant="outlined"
							fullWidth
							type="number"
							required
							value={formData.diametrs}
							onChange={(e) => updateDetailsField('diametrs', e.target.value)}
						/>
						<TextField
							label="Garums"
							variant="outlined"
							fullWidth
							required
							type="number"
							value={formData.garums}
							onChange={(e) => updateDetailsField('garums', e.target.value)}
						/>
					</Stack>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
							<DatePicker
								label="Verifijācijas datums"
								value={formData.verifiedOnDate}
								slotProps={{ textField: { fullWidth: true } }}
							/>
						</Stack>
					</LocalizationProvider>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							label="Piezīmes"
							variant="outlined"
							multiline
							minRows={6}
							fullWidth
							value={formData.piezimes}
							onChange={(e) => updateDetailsField('piezimes', e.target.value)}
						/>
					</Stack>
				</div>
			</div>
		</>
	);
};

export default ChangeForm;
