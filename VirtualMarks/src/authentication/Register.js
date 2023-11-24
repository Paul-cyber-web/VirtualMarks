import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import AuthContext from "../context/AuthContext";
import axios from 'axios'
import { BASE_URL } from "../../config";

export default function Register({ navigation }) {

    const { setAuth, setLoading } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [processingRegister, setProcessingRegister] = useState(false)

    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
    }

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text)
    }

    const register = async () => {
        setProcessingRegister(true)
        if (password == confirmPassword) {
            axios.post(BASE_URL + `/user/register`, {
                username: username,
                password: password,
                confirmPassword: confirmPassword
            })
                .then(async (res) => {
                    await createSession(res.data.userId, res.data.token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    setAuth({ userId: res.data.userId, token: res.data.token })
                    setProcessingRegister(false)
                })
                .catch(err => {
                    console.log(err)
                    setError("Error occurred. Try again later")
                    setProcessingRegister(false)
                })
        }
        else {
            setError("Passwords do not match")
        }
    }

    const createSession = async (userId, token) => {
        await SecureStore.setItemAsync('userId', userId);
        await SecureStore.setItemAsync('token', token);
    }

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={{ flex: 1, alignContent: 'center', backgroundColor: "white", padding: 25, paddingBottom: 170 }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
            <Text variant="headlineSmall" style={{ fontWeight: "bold", paddingVertical: 20, color: "#352E33", textAlign: 'center' }}>Sign up to VirtualMarks</Text>
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
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TextInput
                    textColor="black"
                    onChangeText={handleConfirmPasswordChange}
                    style={{ backgroundColor: "white", marginTop: 15 }}
                    mode="outlined"
                    label="Confirm password"
                    outlineColor="#5F7984"
                    activeOutlineColor="#5F7984"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                {error.length > 0 &&
                    <Text style={{ color: "#FF5C56", paddingTop: 20, paddingStart: 2, fontWeight: "bold" }}>{error}</Text>
                }
            </View>
            {processingRegister ?
                <ActivityIndicator style={{ marginTop: 60 }} animating={true} color="#738290" />
                :
                <Button textColor="white" onPress={register} style={{ backgroundColor: "#738290", marginTop: 40 }} mode="contained">Create account</Button>
            }

            {processingRegister == false &&
                <View style={{ alignSelf: 'center', marginVertical: 30, marginTop: 70 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ textDecorationLine: "underline", color: "#4285f4" }}>Already have an account? Login here</Text>
                    </TouchableOpacity>
                </View>
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        marginTop: 15,
        marginBottom: 20,
        marginStart: 18,
        marginEnd: 18,
        // width:"100%"
    },
});