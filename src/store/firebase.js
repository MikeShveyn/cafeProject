import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  push,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0-hEc_79Do9rcDUUFa4TklGJui3jbAWI",
  authDomain: "cafe-f0195.firebaseapp.com",
  databaseURL: "https://cafe-f0195-default-rtdb.firebaseio.com",
  projectId: "cafe-f0195",
  storageBucket: "cafe-f0195.appspot.com",
  messagingSenderId: "323160095814",
  appId: "1:323160095814:web:18b3004470a140feddde47",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


export const createUser = async (name, email, password, type) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    const token = response._tokenResponse.idToken;
    const userData = {
      uid: user.uid,
      name: name,
      email: email,
      type: type,
    };
    await writeUserData(userData);
    return { token, userData };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const token = response._tokenResponse.idToken;
    const userData = await getUserData();
    return { token, userData };
  } catch (error) {
    throw error;
  }
};

export const getMenuData = async () => {
  return new Promise((resolve) => {
    onValue(
      ref(db, "menuItems"),
      (snapshot) => {
        if (snapshot.exists()) {
          resolve(cleanMenuData(snapshot.val()));
        } else {
          resolve(null);
        }
      },
      {
        onlyOnce: true,
      }
    );
  });
};


export const addMenuItem = async (item) => {
  const menuListRef = ref(db, "menuItems");
  const newMenuRef = push(menuListRef);
  await set(newMenuRef, {
    title: item.title,
    image: item.image,
    price: item.price,
    descr: item.descr,
    type: item.type,
  });
};

export const editMenuData = async(id, item) => {
  const updateObj = {};
  updateObj["/menuItems/" + id] = item;
  await update(db, updateObj); 
};

function cleanMenuData(response) {
  const cleanData = [];
  for (const key in response) {
    const item = {
      id: key,
      ...response[key],
    };
    cleanData.push(item);
  }
  return cleanData;
}

async function writeUserData(userData) {
  await set(ref(db, "users/" + userData.uid), {
    uid: userData.uid,
    name: userData.name,
    email: userData.email,
    type: userData.type,
  });
}

async function getUserData() {
  return new Promise((resolve) => {
    const uid = auth.currentUser.uid;
    onValue(
      ref(db, "users/" + uid),
      (snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          resolve(null);
        }
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export default createUser;
