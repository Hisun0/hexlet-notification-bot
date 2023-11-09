import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, get, child, push } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const sortKeys = (data) => {
  const sortedArray = Object.entries(data).sort(([key1], [key2]) =>
    key1.localeCompare(key2)
  );
  return Object.fromEntries(sortedArray);
};

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

  async get(key) {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, key));
      if (!snapshot.exists()) {
        throw new Error('No data available!');
      }
      return snapshot.val();
    } catch (err) {
      return err;
    }
  }

  push(data, key) {
    return push(ref(this.db, key), data).key;
  }

  update(data, key, id) {
    update(ref(this.db, `${key}/${id}`), data);
  }

  async getId(data, key) {
    const dbData = await this.get(key);
    const sortedData = sortKeys(data);
    return Object.entries(dbData).find(
      ([, value]) => JSON.stringify(value) === JSON.stringify(sortedData)
    )[0];
  }
}

export default Firebase;
