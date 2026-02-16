window.firebaseConfig = {
  apiKey: import.meta.env?.apiKey,
  authDomain: import.meta.env?.authDomain,
  projectId: import.meta.env?.projectId,
  storageBucket: import.meta?.storageBucket,
  messagingSenderId: import.meta?.messagingSenderId,
  appId: import.meta?.appId,
  databaseURL: import.meta?.databaseURL
};
