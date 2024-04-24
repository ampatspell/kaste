const config = firebase => ({
  firebase,
  functions: {
    region: 'europe-west3'
  }
});

const development = config({
  apiKey: "AIzaSyCeJdvx-IHyO55xUIn_7pw5Tr1AUgHyC8M",
  authDomain: "quatsch-c63e2.firebaseapp.com",
  databaseURL: "https://quatsch-c63e2.firebaseio.com",
  projectId: "quatsch-c63e2",
  storageBucket: "quatsch-c63e2.appspot.com",
  messagingSenderId: "840682111138",
  appId: "1:840682111138:web:5d1de57da791f9fa"
});

const production = config({
  apiKey: "AIzaSyCAG0P87gI7bTFvTy2mgTXZtw2jn8Ar4fU",
  authDomain: "maija-sjomkane.firebaseapp.com",
  projectId: "maija-sjomkane",
  storageBucket: "maija-sjomkane.appspot.com",
  messagingSenderId: "828826462006",
  appId: "1:828826462006:web:7fe9cf142dbdf1009bb597"
});

module.exports = {
  development,
  production
};
