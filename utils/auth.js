import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { storeData, clearStorage } from "./storage"

const userIsLoggeIn = async () => {
    return null;
}

const authLogin = async (firebaseApp, emailText, passwordText) => {
    const auth = getAuth(firebaseApp);

    try{
        const result = await signInWithEmailAndPassword(
            auth, 
            emailText, 
            passwordText
            ); 

            storeData("user", {
                displayName: result.user.displayName,
                email: result.user.email,
                phoneNumber:result.user.phoneNumber,
                photoURL:result.user.phoneNumber,
                uid:result.user.uid,
            })
    }  catch(err){
        throw err;
    }

};

const authRegister = async (firebaseApp, emailText, passwordText) => {
    const auth = getAuth(firebaseApp);
    try{
        const result = await createUserWithEmailAndPassword(
            auth, 
            emailText, 
            passwordText
            );

            storeData("user", {
                displayName: result.user.displayName,
                email: result.user.email,
                phoneNumber:result.user.phoneNumber,
                photoURL:result.user.phoneNumber,
                uid:result.user.uid,
            })

    } catch(err){
        throw err;
    }
}

const authLogout = () => {
    clearStorage();
}

export {
    userIsLoggeIn,
    authLogin,
    authRegister,
    authLogout
}