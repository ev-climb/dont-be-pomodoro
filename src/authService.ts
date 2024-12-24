import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// @ts-ignore
import { auth } from "./firebaseConfig";

// Регистрация пользователя
export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Авторизация пользователя
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Выход пользователя
export const logoutUser = async () => {
  return await signOut(auth);
};
