import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import AuthContext from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../../config";


export default function Login({ navigation }) {

    const { setAuth } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [processingLogin, setProcessingLogin] = useState(false)

    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
    }

    const getUserRooms = async () => {
        await axios.post(BASE_URL + '/user/get-user-rooms', { userId: "655f0e68f1958d1981fa0525" })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const login = async () => {
        setProcessingLogin(true)
        axios.post(BASE_URL + `/user/login`, {
            username: username,
            password: password
        })
            .then(async (res) => {
                console.log(res.data)
                await createSession(res.data.userId, res.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                setAuth({ userId: res.data.userId, token: res.data.token, role: res.data.role })
                setProcessingLogin(false)
            })
            .catch(err => {
                console.log(err)
                setError("Invalid username or password")
                setProcessingLogin(false)
            })
    }

    const createSession = async (userId, token) => {
        await SecureStore.setItemAsync('userId', userId);
        await SecureStore.setItemAsync('token', token);
    }

    useEffect(()=>{
        getUserRooms()
    }, [])

    return (
        <ScrollView contentContainerStyle={{ justifyContent: "center" }} style={{ flex: 1, alignContent: 'center', backgroundColor: "white", padding: 25, paddingBottom: 170 }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Text variant="headlineSmall" style={{ fontWeight: "bold", paddingVertical: 20, color: "#352E33", textAlign: 'center' }}>Sign in to VirtualMarks</Text>
                <Text variant="bodyMedium" style={{ fontWeight: "bold", paddingVertical: 20, color: "#5F7984", textAlign: 'center' }}>For any student or teacher willing to ease their work</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
                <TextInput
                    textColor="black"
                    onChangeText={handleUsernameChange}
                    style={{ backgroundColor: "white" }}
                    mode="outlined"
                    label="Username"
                    outlineColor="#5F7984"
                    activeOutlineColor="#5F7984"
                    autoCapitalize="none"
                />
                <TextInput
                    textColor="black"
                    onChangeText={handlePasswordChange}
                    style={{ backgroundColor: "white", marginTop: 15 }}
                    mode="outlined"
                    label="Password"
                    outlineColor="#5F7984"
                    activeOutlineColor="#5F7984"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                {error.length > 0 &&
                    <Text style={{ color: "#FF5C56", paddingTop: 20, paddingStart: 2, fontWeight: "bold" }}>{error}</Text>
                }
            </View>
            {processingLogin ?
                <ActivityIndicator style={{ marginTop: 70 }} animating={true} color="#738290" />
                :
                <Button onPress={login} textColor="white" style={{ backgroundColor: "#738290", marginTop: 40 }} mode="contained">Sign in</Button>
            }
            {processingLogin == false &&
                <View style={{ alignSelf: 'center', marginVertical: 30, marginTop: 70 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ textDecorationLine: "underline", color: "#4285f4" }}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({

});