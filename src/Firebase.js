import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class Firebase {
  static id = 0;

  constructor(config) {
    const app = initializeApp(config.firebaseConfig.firebase);
    this.db = getDatabase(app);
    this.config = config;
  }

  async auth() {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(
        auth,
        this.config.firebaseConfig.auth.email,
        this.config.firebaseConfig.auth.password
      );
      return user;
    } catch (err) {
      throw new Error('User not found!');
    }
  }

  get(key) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, key))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  set(data, key) {
    data.forEach((el) => set(ref(this.db, `/${key}/${Firebase.id++}`), el));
  }
}

export default Firebase;
