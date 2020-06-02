const admin = require('firebase-admin');
const serviceAccount = require('./default-service-key.json');

const databaseURL = 'https://proven-agility-253106.firebaseio.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});
const db = admin.firestore();

module.exports = {
  db,
  databaseURL,
};
