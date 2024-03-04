/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { app } from "../Firebase/Firebase.config";


export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    //Function For create User
    const createUser = (email,password) => {

        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);

    }

    //Function For existing user signIn
    const signIn = (email,password) => {

        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)

    }

    //Function For existing user Logout
    const logOut = () => {

        setLoading(true);
        return signOut(auth)

    }

    //Update User Profile
    const updateUserProfile = (name, photo ) => {

        return updateProfile(auth.currentUser, {

            displayName: name, 
            photoURL: photo

        })
       

    }


    useEffect(()=> {

    const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);

        })

        return () => {

            return unsubscribe();

        }

    },[])

    const authInfo = {

        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;