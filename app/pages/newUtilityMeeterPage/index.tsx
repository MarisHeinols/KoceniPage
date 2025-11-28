import React, { useEffect, useState } from 'react';
import type { Signature, UtilityMeeter } from '../utilityMeeterPage';
import { Box, Button, CircularProgress } from '@mui/material';
import styles from './NewUtilityMeeterPage.module.css';
import {
	addCityAddressMappingWithRetry,
	addNewEntryWithRetry,
	getAddressMapping,
} from '~/firestore/firestore';
import Modal from '~/components/Modal';
import NewMeeterForm from '~/components/NewMeeterForm';
import SignOff from '~/components/SignOff';

const newUtilityMeeter: UtilityMeeter = {
	id: '',
	adress: '',
	city: '',
	details: {
		action: 'Pārbaude',
		radijums: '',
		iemesls: '',
		novietojums: '',
		atrodas: 'string',
		installed: [],
		tips: '',
		plombaNr: '',
		marka: '',
		diametrs: '',
		garums: '',
		piezimes: '',
		verifiedTillDate: null,
		veids: '',
	},
	signiture: {
		clientSigniture: '',
		workerSigniture: '',
		worker: '',
		date: null,
	},
	client: { clientFullName: '', mobileNr: '' },
};

const NewUtilityMeeterPage = () => {
	const [utilityMeeter, setUtilityMeeter] =
		useState<UtilityMeeter>(newUtilityMeeter);
	const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
	const [loading, setIsLoading] = useState(true);
	const [formIsCompleted, setIsFormCompleted] = useState(false);
	const [mapping, setMapping] = useState<
		Record<string, Record<string, string[]>>
	>({});
	const [signiture, setSigniture] = useState<Signature | null>(null);

	const handleUploadNewMeeter = async () => {
		if (!utilityMeeter) return;
		setIsLoading(true);
		setUploadSuccess(null);

		const success = await addNewEntryWithRetry(utilityMeeter);
		const sucessAdressUpdagte = await addCityAddressMappingWithRetry(
			utilityMeeter.city,
			utilityMeeter.adress,
			utilityMeeter.id
		);

		setIsLoading(false);
		setUploadSuccess(success && sucessAdressUpdagte);
	};

	const closeModal = () => {
		setIsLoading(false);
		setUploadSuccess(null);
		setUtilityMeeter(newUtilityMeeter);
	};

	useEffect(() => {
		const fetchMapping = async () => {
			try {
				const data = await getAddressMapping();
				setMapping(data);
			} catch (err) {
				console.error('Error loading address mapping:', err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMapping();
	}, []);

	if (loading) {
		return (
			<Box p={4} display="flex" justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<div className={styles.content}>
			<Modal isOpen={loading || uploadSuccess !== null} onClose={closeModal} />

			<h1 className={styles.heading}>Jauns ieraksts</h1>
			<NewMeeterForm
				utilityMeeter={utilityMeeter}
				setUtilityMeeter={setUtilityMeeter}
				setIsFormCompleted={setIsFormCompleted}
				mapping={mapping}
			/>
			<SignOff setSigniture={setSigniture} />
			<div className={styles.buttonContainer}>
				<Button
					disabled={formIsCompleted && signiture ? false : true}
					variant="contained"
					onClick={() => {
						handleUploadNewMeeter();
					}}
				>
					Iesniegt
				</Button>
			</div>
		</div>
	);
};

export default NewUtilityMeeterPage;
