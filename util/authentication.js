import { getAuth, signOut } from "firebase/auth";
import useUserStore from '../src/store/userStore';

const auth = getAuth();

export const logout = async () => {
  await signOut(auth);
  useUserStore.getState().clearUser();
};
