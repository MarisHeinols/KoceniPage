import Selector from '~/components/Selector';
import styles from './skaititajiPage.module.css';
import Form from '~/components/Form';
import SignOff from '~/components/SignOff';

const SkaititajiPage = () => {
	return (
		<div className={styles.content}>
			<Selector />
			<Form />
			<SignOff />
		</div>
	);
};

export default SkaititajiPage;
