import React, { useEffect, useState } from 'react';
import styles from './SignOff.module.css';
import { Stack, TextField } from '@mui/material';
import type { Signature } from '~/pages/utilityMeeterPage';
import { getUserCredentails } from '~/firestore/firestore';
interface SignOffProps {
	setSigniture: (signature: Signature) => void;
}
const SignOff = ({ setSigniture }: SignOffProps) => {
	const [clientSigniture, setClientSigniture] = useState<string | null>(null);
	const [workerSigniture, setWorkerSigniture] = useState<string | null>(null);
	const [workerName, setWorkerName] = useState<string | null>(null);

	useEffect(() => {
		if (!workerName) {
			const respons = getUserCredentails();
			if (respons) {
				setWorkerName(respons);
			}
		}
	}, []);

	useEffect(() => {
		if (clientSigniture && workerSigniture && workerName) {
			setSigniture({
				clientSigniture: clientSigniture,
				workerSigniture: workerSigniture,
				worker: workerName,
				date: new Date(),
			});
		}
	}, [workerName, workerSigniture, clientSigniture]);

	return (
		<div className={styles.signOffContainer}>
			<h2 className={styles.headings}>Apstiprinājums</h2>
			<div className={styles.signOffEntry}>
				<h2>Apstiprinu (Klients):</h2>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<TextField
						label="Paraksts"
						variant="outlined"
						required
						value={clientSigniture}
						onChange={(e) => {
							setClientSigniture(e.currentTarget.value);
						}}
					/>
				</Stack>
			</div>
			<div className={styles.signOffEntry}>
				<h2>Darbinieks: {workerName} </h2>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<TextField
						label="Paraksts"
						variant="outlined"
						required
						value={workerSigniture}
						onChange={(e) => {
							setWorkerSigniture(e.currentTarget.value);
						}}
					/>
				</Stack>
			</div>
		</div>
	);
};

export default SignOff;
