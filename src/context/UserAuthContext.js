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
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth, firestore } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
        /*.then(() => {
            console.log(auth.currentUser)
        })*/
    }
    function signUp(email, name, password) {

        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: name,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/steadfastprivateschools-admin.appspot.com/o/images%2Fuser.png?alt=media&token=f2be9e1d-7260-49c2-aed2-8032acea012c",
                })

                //console.log(user)

                setDoc(doc(firestore, "student-list", user.uid), {
                    Username: name,
                    email: email,
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/steadfastprivateschools-admin.appspot.com/o/images%2Fuser.png?alt=media&token=f2be9e1d-7260-49c2-aed2-8032acea012c",
                    UserID: user.uid,
                    password: password,
                    scores: [],
                    maxScore: 0,
                    timeTaken: []
                })
            })
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user

                const userUpdate = async (e) => {
                    const userRef = doc(firestore, "student-list", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists) {
                        console.log('user already exists')
                        //console.log(userSnap.data())
                    } else {
                        setDoc(doc(firestore, "student-list", user.uid), {
                            Username: user.displayName,
                            email: user.email,
                            imageURL: user.photoURL,
                            UserID: user.uid,
                            password: 'none',
                            scores: [],
                            maxScore: 0,
                            timeTaken: []
                        })
                    }
                }
                userUpdate()
            })
    }

    function facebookSignUp() {
        const provider = new FacebookAuthProvider();

        return signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user

                const userUpdate = async (e) => {
                    const userRef = doc(firestore, "student-list", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists) {
                        console.log('user already exists')
                        //console.log(userSnap.data())
                    } else {
                        setDoc(doc(firestore, "student-list", user.uid), {
                            Username: user.displayName,
                            email: user.email,
                            imageURL: user.photoURL,
                            UserID: user.uid,
                            password: 'none',
                            scores: [],
                            maxScore: 0,
                            timeTaken: []
                        })
                    }
                }

                userUpdate()
            })
    }

    function logOut() {
        return signOut(auth);
    }

    function forgetpassword(email) {
        return sendPasswordResetEmail(auth, email, {
            url: ''
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
            value={{ user, logIn, signUp, googleSignIn, facebookSignUp, logOut, forgetpassword, changepassword }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}