import React, { useEffect, useState } from 'react';
import Form from '../Form';
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { getAddressMapping } from '~/firestore/firestore';
import type { UtilityMeeter } from '~/pages/utilityMeeterPage';
import styles from './NewMeeterForm.module.css';

interface NewMeeterFormProps {
	utilityMeeter: UtilityMeeter;
	setUtilityMeeter: React.Dispatch<React.SetStateAction<UtilityMeeter>>;
	setIsFormCompleted: (isFormValid: boolean) => void;
	mapping: Record<string, Record<string, string[]>>;
}

const NewMeeterForm = ({
	utilityMeeter,
	setUtilityMeeter,
	setIsFormCompleted,
	mapping,
}: NewMeeterFormProps) => {
	const cities = Object.keys(mapping);

	const updateUtilityMeeterValue = (path: string, value: any) => {
		setUtilityMeeter((prevState: UtilityMeeter): UtilityMeeter => {
			const newState = { ...prevState };
			const keys = path.split('.');
			let tempState: any = newState;

			for (let i = 0; i < keys.length - 1; i++) {
				tempState = tempState[keys[i]];
			}

			tempState[keys[keys.length - 1]] = value;
			return newState;
		});
	};

	return (
		<div className={styles.formContainer}>
			<div className={styles.formUpperContainer}>
				<div className={styles.formContainerLeft}>
					<FormControl sx={{ width: '100%', mb: 2 }}>
						<Grid container spacing={2}>
							<TextField
								label="ID"
								variant="outlined"
								required
								fullWidth
								value={utilityMeeter.id}
								onChange={(e) =>
									updateUtilityMeeterValue('id', e.currentTarget.value)
								}
							/>

							<TextField
								label="Klienta Vārds Uzvārds"
								variant="outlined"
								required
								fullWidth
								value={utilityMeeter.client.clientFullName}
								onChange={(e) =>
									updateUtilityMeeterValue(
										'client.clientFullName',
										e.currentTarget.value
									)
								}
							/>

							<TextField
								label="Klienta Tel nr"
								variant="outlined"
								required
								fullWidth
								value={utilityMeeter.client.mobileNr}
								onChange={(e) =>
									updateUtilityMeeterValue(
										'client.mobileNr',
										e.currentTarget.value
									)
								}
							/>
						</Grid>
					</FormControl>
				</div>
				<div className={styles.formContainerRight}>
					<FormControl sx={{ width: '100%', mb: 2 }}>
						<Grid container spacing={2}>
							{' '}
							<InputLabel id="city">Ciems</InputLabel>
							<Select
								labelId="city"
								value={utilityMeeter.city}
								label="Ciems"
								onChange={(e) =>
									updateUtilityMeeterValue('city', e.target.value)
								}
							>
								{cities.map((city) => (
									<MenuItem key={city} value={city}>
										{city}
									</MenuItem>
								))}
							</Select>
							<TextField
								label="Adrese"
								variant="outlined"
								required
								fullWidth
								value={utilityMeeter.adress}
								onChange={(e) =>
									updateUtilityMeeterValue('adress', e.currentTarget.value)
								}
							/>
						</Grid>
					</FormControl>
				</div>
			</div>

			<Form
				utilityMeeter={utilityMeeter}
				setUtilityMeeter={setUtilityMeeter}
				setIsFormCompleted={setIsFormCompleted}
				customTitle=" "
			/>
		</div>
	);
};

export default NewMeeterForm;
