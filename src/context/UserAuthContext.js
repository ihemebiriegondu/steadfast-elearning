import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    confirmPasswordReset,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, name, password) {

        return createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: name,
                })
            })
            .then((currentuser) => console.log(currentuser))
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    function logOut() {
        return signOut(auth);
    }

    function forgetpassword(email) {
        return sendPasswordResetEmail(auth, email, {
            url: 'https://prepquizzes-homepage.netlify.app/forgetpassword?'
        });
    }

    function changepassword(oobCode, password) {
        //const newPassword = getASecureRandomPassword();
        /*return updatePassword(auth.currentUser, password)
            .then(() => {
                console.log(auth.currentUser)
                // Update successful.
                
            }).catch((error) => {
                // An error ocurred
                // ...
            });*/
        return confirmPasswordReset(auth, oobCode, password)
            .then(() => {

            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            //console.log("Auth", currentuser);
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, googleSignIn, logOut, forgetpassword, changepassword }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}