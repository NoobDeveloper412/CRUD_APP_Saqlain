import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase-config";

export const signup = async ({ email, password }, history) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    history("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = async ({ email, password }, history) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    history("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};
