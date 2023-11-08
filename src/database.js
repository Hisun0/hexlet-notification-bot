import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import config from "../config.js";
import courses from "../data/courses.js";
import { func } from "./parser/main.js";
import pkg from "lodash";
const { uniqueId } = pkg;

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
  assignments.forEach((assignment) =>
    set(ref(db, `/assignments/${uniqueId()}`), assignment)
  );
};

const getData = () => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `/assignments`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

getData();

await writeUserData();
