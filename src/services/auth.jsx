import { 
    createUserWithEmailAndPassword,  
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
} from 'firebase/auth';
import { auth } from "./firebase";



const logInWithEmailAndPassword = async ({email, password}) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = async () => {
 await signOut(auth);
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    debugger
    const user = res.user;
    await addDoc(collection(db, 'trainers'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
    firebase.auth().user.sendEmailVerification().then(function() {
      console.log('Verification email sent');
    }).catch(function(error) {console.error(error)});
  } catch (err) {
    console.error(err);
  }
};

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//   } catch (err) {
//     console.error(err);
//   }
// };

export {
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword
};