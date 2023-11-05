import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import config from "../config.js";
import courses from "../data/courses.js";
import { func } from "./parser/main.js";

const app = initializeApp(config.firebaseConfig.firebase);
const auth = getAuth();
await signInWithEmailAndPassword(
  auth,
  config.firebaseConfig.auth.email,
  config.firebaseConfig.auth.password
);
const db = getDatabase(app);

const writeUserData = async () => {
  const assignments = await func(courses);
  set(ref(db, "/assignments"), assignments);
};

await writeUserData();
