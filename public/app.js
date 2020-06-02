/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', async () => {
  // const BASE_URL = 'https://localhost:5000';
  // const { data } = await (await fetch(BASE_URL)).json();
});

const updateShop = (e) => {
};

const uploadFile = async (files) => {
};

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const { user } = result;
      document.write(`Hello ${user.displayName}`);
      console.log(user);
    })
    .catch((err) => console.error(err));
};
