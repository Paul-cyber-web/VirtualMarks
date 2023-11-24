import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import AuthContext from '../context/AuthContext'
import { ActivityIndicator, Button, Card, Dialog, IconButton, List, Menu, Portal, Text } from 'react-native-paper';
import Grades from './Grades';
import axios from 'axios';
import { BASE_URL } from '../../config';
import StudentsModal from '../components/StudentsModal';
import GiveMarkModal from '../components/GiveMarkModal';
import Profile from './Profile';
import { Feather } from '@expo/vector-icons';
import CreateRoomModal from '../components/CreateRoom';
import { useFocusEffect } from '@react-navigation/native';

const colors = [
    "#A9A9A9",
    "#508D69",
    "#FF9130",
    "#FF5B22"
]

export default function Home({ navigation }) {

    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState(null)
    const [roomUsers, setRoomUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingRoomUsers, setLoadingRoomUsers] = useState(true)

    const { auth, logoutUser } = useContext(AuthContext)

    const getUserRooms = async () => {
        setRooms([])
        axios.post(BASE_URL + '/user/get-user-rooms', { userId: auth.userId })
            .then(res => {
                setRooms(res.data.rooms.rooms)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const getRoomUsers = async (roomId) => {
        axios.post(BASE_URL + '/room/get-room-users', { roomId: roomId })
            .then(res => {
                setRoomUsers(res.data?.users?.users)
                setLoadingRoomUsers(false)
            })
            .catch(err => console.log(err))
    }

    const deleteRoom = async (roomId) => {
        axios.delete(BASE_URL + '/room/delete-room/' + roomId)
            .then(res => {

                hideDialog()
                getUserRooms()
            })
            .catch(err => console.log(err))
    }

    const [gradesVisible, setGradesVisible] = useState(false);
    const showGradesModal = () => setGradesVisible(true);
    const hideGradesModal = () => setGradesVisible(false);

    const [studentsVisible, setStudentsVisible] = useState(false);
    const showStudentsModal = () => setStudentsVisible(true);
    const hideStudentsModal = () => setStudentsVisible(false);

    const [giveMarkVisible, setGiveMarkVisible] = useState(false);
    const showGiveMarkModal = () => setGiveMarkVisible(true);
    const hideGiveMarkModal = () => setGiveMarkVisible(false);

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleModalPress = (subject) => {
        showModal()
    }

    const handleGradesPress = (room) => {
        setCurrentRoom(room)
        showGradesModal()
    }

    const handleStudentsPress = (room) => {
        getRoomUsers(room?._id)
        setCurrentRoom(room)
        showStudentsModal()
    }

    const handleGiveMarkPress = (room) => {
        getRoomUsers(room?._id)
        setCurrentRoom(room)
        showGiveMarkModal()
    }


    useFocusEffect(
        useCallback(() => {
            getUserRooms()
        }, [])
    )

    const [visibleDialog, setVisibleDialog] = React.useState(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    return (
        <ScrollView>
            {loading == true ?
                <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', marginBottom: 100 }}>
                    <ActivityIndicator animating={true} color="#738290" />
                </View>
                :
                <>
                    <Profile getUserRooms={getUserRooms} />
                    {rooms.length > 0 && rooms.map((item, index) => (
                        <Card key={index} style={{ margin: 10, backgroundColor: colors[index % 4], paddingVertical: 10 }}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ color: 'white', fontWeight: "bold" }} variant="titleLarge">{item.name}</Text>
                                        <Text style={{ color: 'white' }} variant="bodyMedium">Code: {item.code}</Text>
                                    </View>
                                    {auth.userId == item?.creator &&
                                        <View style={{ marginBottom: 20 }}>


                                            <IconButton onPress={showDialog} iconColor="white" icon="delete"></IconButton>
                                            <Portal>
                                                <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                                                    <Dialog.Title>Delete classroom</Dialog.Title>
                                                    <Dialog.Content>
                                                        <Text variant="bodyMedium">Are you sure you want to delete this classroom?</Text>
                                                    </Dialog.Content>
                                                    <Dialog.Actions>
                                                        <Button textColor='gray' onPress={hideDialog}>Cancel</Button>
                                                        <Button textColor='red' onPress={() => deleteRoom(item._id)}>Yes</Button>
                                                    </Dialog.Actions>
                                                </Dialog>
                                            </Portal>
                                        </View>
                                    }
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                {auth.userId == item?.creator ?
                                    <>
                                        <Button style={{ margin: 5 }} onPress={() => { handleStudentsPress(item) }} mode="contained" textColor="black" buttonColor='white' labelStyle={{ fontWeight: "bold" }}>Students</Button>
                                        <Button style={{ margin: 5 }} onPress={() => { handleGiveMarkPress(item) }} mode="contained" textColor="black" buttonColor='white' labelStyle={{ fontWeight: "bold" }}>Give mark</Button>
                                    </>
                                    :
                                    <Button style={{ margin: 5 }} onPress={() => { handleGradesPress(item) }} mode="contained" textColor="black" buttonColor='white' labelStyle={{ fontWeight: "bold" }}>Grades</Button>
                                }
                            </Card.Actions>
                        </Card>
                    ))}
                    <View style={{ paddingTop: 15, paddingBottom: 40 }}>
                        <List.Item style={{ padding: 5 }} onPress={showModal} title="Create classroom" titleStyle={{ color: "black", fontWeight: "600" }} right={() => <Feather name="edit" size={24} color="black" />} />
                        <List.Item style={{ padding: 5 }} onPress={logoutUser} title="Logout" titleStyle={{ color: "#FF5C56", fontWeight: "600" }} right={() => <Feather name="log-out" color="#FF5C56" size={24} />} />
                    </View>

                    <Grades visible={gradesVisible} showModal={showGradesModal} hideModal={hideGradesModal} roomId={currentRoom} userId={auth.userId} />
                    <StudentsModal loading={loadingRoomUsers} roomUsers={roomUsers} roomId={currentRoom} currentUser={auth.userId} visible={studentsVisible} showModal={showStudentsModal} hideModal={hideStudentsModal} />
                    <GiveMarkModal roomUsers={roomUsers} roomId={currentRoom} currentUser={auth.userId} visible={giveMarkVisible} showModal={showGiveMarkModal} hideModal={hideGiveMarkModal} />
                    <CreateRoomModal visible={modalVisible} showModal={showModal} hideModal={hideModal} getUserRooms={getUserRooms} />
                </>
            }

        </ScrollView>
    )
}