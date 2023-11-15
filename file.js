import Firebase from "./src/classes/Firebase.js";
import config from "./config.js";

const firebase = new Firebase(config);

firebase.auth();

const coll = await firebase.get(' ', 'assignments');
console.log(coll);