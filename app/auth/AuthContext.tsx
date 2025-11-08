import { onAuthStateChanged, type User } from 'firebase/auth';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import { auth } from '~/firestore/firestore';

interface AuthContextType {
	user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setInitialized(true);
		});

		return () => unsubscribe();
	}, []);

	if (!initialized) return null;

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
