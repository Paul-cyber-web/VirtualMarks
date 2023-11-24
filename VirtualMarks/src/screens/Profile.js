import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ActivityIndicator, Avatar, List, Button, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { DataTable } from 'react-native-paper';
import axios from 'axios'
import JoinRoomModal from '../components/JoinRoomModal';
import { BASE_URL } from '../../config';

const Profile = ({ getUserRooms }) => {

    const { auth, logoutUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [items] = React.useState([
        {
            key: 1,
            date: new Date('2023-10-12').toDateString(),
            subject: "Maths",
            grade: 10,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            subject: "History",
            grade: 8,
        },

        {
            key: 1,
            date: new Date('2023-11-22').toDateString(),
            subject: "English",
            grade: 7,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            subject: "Programming",
            grade: 3,
        },
        {
            key: 1,
            date: new Date('2023-10-12').toDateString(),
            subject: "Maths",
            grade: 10,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            subject: "History",
            grade: 8,
        },

        {
            key: 1,
            date: new Date('2023-11-22').toDateString(),
            subject: "English",
            grade: 7,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            subject: "Programming",
            grade: 3,
        },
        {
            key: 1,
            date: new Date('2023-10-12').toDateString(),
            subject: "Maths",
            grade: 10,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            subject: "History",
            grade: 8,
        },

        {
            key: 1,
            date: new Date('2023-11-22').toDateString(),
            subject: "English",
            grade: 7,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            subject: "Programming",
            grade: 3,
        },
    ]);
    const [user, setUser] = useState({})

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleModalPress = (subject) => {
        showModal()
    }

    const getUser = async () => {
        await axios.get(BASE_URL + '/user/get-user')
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            {loading == true ?
                <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', marginBottom: 100 }}>
                    <ActivityIndicator animating={true} color="#738290" />
                </View>
                :
                <View style={styles.container}>

                    <View style={styles.profileDetailsContainer}>
                        <View>
                            <Text style={styles.currentDay}>{user?.username}</Text>
                            <Text style={{ color: "black" }}>Joined on {new Date(user?.createdAt).toDateString()}</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <IconButton icon="plus" mode="contained" containerColor='#738290' iconColor="white" onPress={() => handleModalPress()} />
                        </View>
                    </View>

                    <JoinRoomModal visible={modalVisible} showModal={showModal} hideModal={hideModal} getUserRooms={getUserRooms} />

                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 20
    },

    profileDetailsContainer: {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 30,
        paddingStart: 20,
    },
    currentDay: {
        fontSize: 23,
        fontWeight: "bold",
        color: 'black'
    },
});

export default Profile