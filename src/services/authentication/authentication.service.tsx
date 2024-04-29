import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

export const loginRequest = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};
