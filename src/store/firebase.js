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

export const getMenuTableData = async (type) => {
  let dbref;
  if (type === "menu") {
    dbref = ref(db, "menuItems");
  } else if (type === "table") {
    dbref = ref(db, "tables");
  }
  return new Promise((resolve) => {
    onValue(
      dbref,
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

export const addOrder = async (order) => {
  const dbref = ref(db, "orders");
  const menuIds = order.data.menu.map(ord => {
    return ord.id;
  })
  const json = {
    name : order.name,
    tableId : order.data.table.id? order.data.table.id : null,
    menu : menuIds
  };

  const newOrderRef = push(dbref);
  await set(newOrderRef, json);
};

export const addMenuTableItem = async (type, item) => {
  let dbref;
  let json;
  if (type === "menu") {
    dbref = ref(db, "menuItems");
    json = {
      title: item.title,
      image: item.image,
      price: item.price,
      descr: item.descr,
      type: item.type,
      place: item.place,
    };
  } else if (type === "table") {
    dbref = ref(db, "tables");
    json = {
      title: item.title,
      image: item.image,
      descr: item.descr,
      place: item.place,
      avaliable: item.avaliable,
    };
  }
  const menuListRef = dbref;
  const newMenuRef = push(menuListRef);
  await set(newMenuRef, json);
};

export const updateMenuTableData = async (type, id, item) => {
  let dbref;
  let json;
  if (type === "menu") {
    dbref = ref(db, "menuItems/" + id);
    json = {
      title: item.title,
      image: item.image,
      price: item.price,
      descr: item.descr,
      type: item.type,
      place: item.place,
    };
  } else if (type === "table") {
    dbref = ref(db, "tables/" + id);
    json = {
      title: item.title,
      image: item.image,
      descr: item.descr,
      place: item.place,
      avaliable: item.avaliable,
    };
  }
  await update(dbref, json);
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
