import {auth} from '../../firebase';

export const registerUser = (
  email: string,
  password: string
): Promise<string | null | undefined> => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => response.user?.email);
};

export const loginUser = (
  email: string,
  password: string
): Promise<string | null | undefined> => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => response.user?.email);
};

export const logOutUser = (): Promise<void> => auth.signOut();
