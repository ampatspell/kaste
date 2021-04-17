const config = firebase => ({
  firebase,
  functions: {
    region: 'europe-west2'
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
  apiKey: "AIzaSyD-VB88AREQGysXstiKAuZp5p6NBboSkjE",
  authDomain: "kaste-ir.firebaseapp.com",
  databaseURL: "https://kaste-ir.firebaseio.com",
  projectId: "kaste-ir",
  storageBucket: "kaste-ir.appspot.com",
  messagingSenderId: "920112943882",
  appId: "1:920112943882:web:652929ca90332c968aa0f3",
  measurementId: "G-2NE4NEG0YG"
});

module.exports = {
  development,
  production
};
