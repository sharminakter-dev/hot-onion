import firebaseConfig from './firebase.config';
import { initializeApp } from "firebase/app";
import { 
  FacebookAuthProvider, 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile } 
  from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


// create new user
export const createNewUser=(name, email, password)=>{
   return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    // const user = userCredential.user;
    const user = {
      name:name,
      email:email,
      success:true,
      error:''
    };
    // user.newUser = false; 
    updateUserProfile(name)
    return user
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
     const user = {
      name: '',
      email: '',
      success:false,
      error:errorMessage
    }
    // return errorMessage
    return user;
  });
}


// sign in with password
export const signInUser = (email, password )=>{
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const userName = userCredential.user.displayName;
    const user = {
      name: userName,
      email: userCredential.user.email,
      success:true,
      error:''
    }
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
      const user = {
      name: '',
      email: '',
      success:false,
      error:errorMessage
    }
    return user;
  });
}

// facebook login
export const facebookSignIn = ()=>{
  const fbProvider = new FacebookAuthProvider();
  return signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user ={
      name: result.user.displayName,
      email: result.user.email,
      imgSrc:result.user.photoURL,
      success:true, 
      error:'',
    };
    return user;
  })
  .catch((error) => {
    // Handle Errors here.
    return {
      success:false, 
      error: error.message
    };
  });


}

// google signIn
export const googlesignIn = ()=>{
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider)
  .then((result) => {
    const user = {
      name: result.user.displayName,
      email: result.user.email,
      imgSrc:result.user.photoURL,
      success: true,
      error: null
    }
    return user;
  }).catch((error) => {
    // Handle Errors here.
    return {
      success:false, 
      error: error.message};
  });

}

// logout
export const signOutUser = () =>{
  return signOut(auth).then(() => {  
    return  { success: true };;
}).catch((error) => {
  return { success: false, error: error.message };
});
}

// update user name
const updateUserProfile = (name)=>{
  updateProfile(auth.currentUser, {
    displayName: name
  }).then(() => {
    // Profile updated!
    console.log(' Profile updated!')
  }).catch((error) => {
    // An error occurred
    console.log('Failed tp update user', error);
});
}
