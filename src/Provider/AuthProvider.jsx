/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { app } from "../Firebase/Firebase.config";
import axios from "axios";


export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    //Function For create User
    const createUser = (email, password) => {

        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }

    //Function For existing user signIn
    const signIn = (email, password) => {

        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)

    }

    //Function For existing user Logout
    const logOut = () => {

        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth)

    }

    //Update User Profile
    const updateUserProfile = (name, photo) => {

        return updateProfile(auth.currentUser, {

            displayName: name,
            photoURL: photo

        })


    }

    //Google Login
    const googleLogin = () => {

        return signInWithPopup(auth, googleProvider)

    }

    // Github Login

    const githubLogin = () => {

        return signInWithPopup(auth, githubProvider)

    }


    useEffect(() => {

        onAuthStateChanged(auth, (user) => {

            const userEmail = user?.email || user?.email;
            const loggedUser = { email: userEmail }

            setUser(user)
            setLoading(false)

            //If user Exist then issue a token
            if (user) {

                axios.post('https://study-together-server.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {

                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        } else {
                            localStorage.removeItem('access-token');
                        }

                    })

            } else {

                axios.post('https://study-together-server.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then(res => {

                        console.log(res.data)
                        localStorage.removeItem('access-token');

                    })

            }


        });


    }, [user])

    console.log(user)

    const authInfo = {

        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleLogin,
        githubLogin

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;