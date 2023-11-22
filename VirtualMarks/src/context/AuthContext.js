import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "http://localhost:5001"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true)


    const logoutUser = async () => {
        await axios.post(BASE_URL + '/user/logout')
            .then(res => {
                SecureStore.deleteItemAsync('userId')
                SecureStore.deleteItemAsync('token')
                setAuth({})
            })
            .catch(err => {
                console.log(err)
            })

    }

    async function retrieveSession() {
        try {
            setLoading(true)
            const userId = await SecureStore.getItemAsync('userId');
            const token = await SecureStore.getItemAsync('token');
            const role = await SecureStore.getItemAsync('role')
            setAuth({ 'token': token, 'userId': userId, "role": role });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //set the header for all the axios request
            setLoading(false)

        } catch (error) {
            setAuth({})
            setLoading(false)
        }
    }

    useEffect(() => {
        retrieveSession()
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
