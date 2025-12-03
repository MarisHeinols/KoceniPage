import { jsPDF } from 'jspdf';
import type { OldMeeter, UtilityMeeter } from '~/pages/utilityMeeterPage';
import './Roboto-Regular-normal.js';

export type FirestoreTimestamp = {
	seconds: number;
	nanoseconds: number;
};

export const generateFullPDF = (entry: UtilityMeeter) => {
	const ts = entry.details?.verifiedOnDate as unknown as FirestoreTimestamp;

	const date = ts?.seconds
		? new Date(ts.seconds * 1000 + ts.nanoseconds / 1_000_000)
		: null;

	const formatedVerifiedOnDate = date
		? date.toLocaleString('lv-LV', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
		: '';

	const tsTill = entry.details
		?.verifiedTillDate as unknown as FirestoreTimestamp;

	const tillDate = tsTill?.seconds
		? new Date(ts.seconds * 1000 + ts.nanoseconds / 1_000_000)
		: null;

	const formatedVerifiedTillDate = tillDate
		? tillDate.toLocaleString('lv-LV', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
		: '';

	const tsDocument = entry.signiture.date as unknown as FirestoreTimestamp;

	const dateDocument = tsDocument?.seconds
		? new Date(ts.seconds * 1000 + ts.nanoseconds / 1_000_000)
		: null;

	const formattedSignitureDate = dateDocument
		? dateDocument.toLocaleString('lv-LV', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
		: '';

	const doc = new jsPDF();
	doc.setFont('Roboto-Regular');

	const pageWidth = doc.internal.pageSize.getWidth();
	const margin = 14;
	const col1x = margin;
	const col2x = pageWidth / 2;
	let y = 20;

	// --- Header ---
	doc.setFontSize(16);
	doc.text(
		`Ūdens Skaitītāja ${entry.details.action == 'Pārbaude' ? 'pārbaudes' : 'nomaiņas'} akts Nr. ${entry.id || ''}`,
		pageWidth / 2,
		y,
		{
			align: 'center',
		}
	);
	y += 12;

	doc.setFontSize(12);
	doc.text(`ID: ${entry.id}`, margin, y);
	y += 8;

	// Horizontal line
	doc.setLineWidth(0.5);
	doc.line(margin, y, pageWidth - margin, y);
	y += 6;

	// --- Client Info ---
	doc.setFontSize(14);
	doc.text('Klienta informācija', margin, y);
	y += 8;
	doc.setFontSize(12);
	doc.text(`Vārds, Uzvārds: ${entry.client?.clientFullName || ''}`, col1x, y);
	doc.text(`Telefons: ${entry.client?.mobileNr || ''}`, col2x, y);
	y += 10;

	// Horizontal line
	doc.line(margin, y, pageWidth - margin, y);
	y += 6;

	// --- Address Info ---
	doc.setFontSize(12);
	doc.text(`${entry.city || ''} ${entry.adress || ''}`, col1x, y);
	y += 10;

	// Horizontal line
	doc.line(margin, y, pageWidth - margin, y);
	y += 6;
	let detailsRows: string[][] = [];
	const d = entry || {};

	if (entry.details.action == 'Pārbaude') {
		// --- Details (two columns) ---
		doc.setFontSize(14);
		doc.text('Skaitītāja informācija', margin, y);
		y += 8;
		doc.setFontSize(12);

		doc.text(`ID: ${d.id || ''}`, col1x, y);
		y += 8;

		detailsRows = [
			[
				`Darbība: ${d.details.action || ''}`,
				`Rādījums: ${d.details.radijums || ''}`,
			],
			[
				`Iemesls: ${d.details.iemesls || ''}`,
				`Novietojums: ${d.details.novietojums || ''}`,
			],
			[`Atrodas: ${d.details.atrodas || ''}`, `Tips: ${d.details.tips || ''}`],
			[
				`Marka: ${d.details.marka || ''}`,
				`Diametrs: ${d.details.diametrs || ''}`,
			],
			[
				`Garums: ${d.details.garums || ''}`,
				`Plombas Nr.: ${d.details.plombaNr || ''}`,
			],
			[
				`Piezīmes: ${d.details.piezimes || ''}`,
				`Veids: ${d.details.veids || ''}`,
			],
		];

		for (const row of detailsRows) {
			doc.text(row[0], col1x, y);
			doc.text(row[1], col2x, y);
			y += 8;
		}
	} else {
		// --- Details (two columns) ---
		if (entry.oldMeeter) {
			const oldUtility: OldMeeter = entry.oldMeeter;
			doc.setFontSize(14);
			doc.text('Noņemtā Skaitītāja informācija', margin, y);
			y += 8;
			doc.setFontSize(12);
			doc.text(`ID: ${oldUtility.id || ''}`, col1x, y);
			y += 8;

			detailsRows = [
				[
					`Darbība: ${oldUtility.details.action || ''}`,
					`Rādījums: ${oldUtility.details.radijums || ''}`,
				],
				[
					`Iemesls: ${oldUtility.details.iemesls || ''}`,
					`Novietojums: ${oldUtility.details.novietojums || ''}`,
				],
				[
					`Atrodas: ${oldUtility.details.atrodas || ''}`,
					`Tips: ${oldUtility.details.tips || ''}`,
				],
				[
					`Marka: ${oldUtility.details.marka || ''}`,
					`Diametrs: ${oldUtility.details.diametrs || ''}`,
				],
				[
					`Garums: ${oldUtility.details.garums || ''}`,
					`Plombas Nr.: ${oldUtility.details.plombaNr || ''}`,
				],
				[
					`Piezīmes: ${oldUtility.details.piezimes || ''}`,
					`Veids: ${oldUtility.details.veids || ''}`,
				],
			];

			for (const row of detailsRows) {
				doc.text(row[0], col1x, y);
				doc.text(row[1], col2x, y);
				y += 8;
			}
		}
		doc.setFontSize(14);
		doc.text('Jaunā Skaitītāja informācija', margin, y);
		y += 8;
		doc.setFontSize(12);
		doc.text(`ID: ${d.id || ''}`, col1x, y);
		y += 8;

		detailsRows = [
			[
				`Darbība: ${d.details.action || ''}`,
				`Rādījums: ${d.details.radijums || ''}`,
			],
			[
				`Iemesls: ${d.details.iemesls || ''}`,
				`Novietojums: ${d.details.novietojums || ''}`,
			],
			[`Atrodas: ${d.details.atrodas || ''}`, `Tips: ${d.details.tips || ''}`],
			[
				`Marka: ${d.details.marka || ''}`,
				`Diametrs: ${d.details.diametrs || ''}`,
			],
			[
				`Garums: ${d.details.garums || ''}`,
				`Plombas Nr.: ${d.details.plombaNr || ''}`,
			],
			[
				`Piezīmes: ${d.details.piezimes || ''}`,
				`Veids: ${d.details.veids || ''}`,
			],
		];

		for (const row of detailsRows) {
			doc.text(row[0], col1x, y);
			doc.text(row[1], col2x, y);
			y += 8;
		}
	}

	doc.text(`Verificēts līdz:: ${formatedVerifiedTillDate}`, col1x, y);
	y += 8;

	// Horizontal line
	doc.line(margin, y, pageWidth - margin, y);
	y += 10;

	// --- Signatures ---
	doc.setFontSize(14);
	doc.text('Paraksti', margin, y);
	y += 8;
	doc.setFontSize(12);

	const sigHeight = 40; // increase height for image
	const sigWidth = (pageWidth - 3 * margin) / 2;

	// Left box - worker
	doc.rect(margin, y, sigWidth, sigHeight);
	doc.text(`Darbinieks: ${entry.signiture?.worker || ''}`, margin + 2, y + 8);

	// Add worker signature image if available
	if (entry.signiture?.workerSigniture) {
		doc.addImage(
			entry.signiture.workerSigniture, // base64 PNG from SignaturePad
			'PNG',
			margin + 2,
			y + 12, // leave space for name
			sigWidth - 4,
			sigHeight - 16
		);
	} else {
		doc.text('Nav', margin + 2, y + 20);
	}

	// Right box - client
	doc.rect(margin + sigWidth + margin, y, sigWidth, sigHeight);
	doc.text(
		`Klients: ${entry.client?.clientFullName || ''}`,
		margin + sigWidth + margin + 2,
		y + 8
	);

	// Add client signature image if available
	if (entry.signiture?.clientSigniture) {
		doc.addImage(
			entry.signiture.clientSigniture, // base64 PNG from SignaturePad
			'PNG',
			margin + sigWidth + margin + 2,
			y + 12,
			sigWidth - 4,
			sigHeight - 16
		);
	} else {
		doc.text('Nav', margin + sigWidth + margin + 2, y + 20);
	}

	y += sigHeight + 10;

	// Date
	doc.text(`Datums: ${formattedSignitureDate}`, margin, y);

	// --- Save PDF ---
	doc.save(`reading_full_${entry.id}.pdf`);
};
