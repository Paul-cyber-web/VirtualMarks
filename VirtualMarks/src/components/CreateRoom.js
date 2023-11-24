import React, { useContext, useState } from 'react'
import { Modal, Portal, Text, Button, TextInput, ActivityIndicator } from 'react-native-paper';
import UsersTable from './UsersTable';
import { Picker } from '@react-native-picker/picker';
import AuthContext from '../context/AuthContext';
import axios from 'axios'
import { BASE_URL } from '../../config'
import { View } from 'react-native'

const CreateRoomModal = ({ room, visible, showModal, hideModal, getUserRooms }) => {

    const [text, setText] = useState('')
    const [roomCode, setRoomCode] = useState(null)
    const { auth } = useContext(AuthContext)

    const containerStyle = { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20 };

    const createRoom = async () => {
        await axios.post(BASE_URL + "/room/create-room", {
            userId: auth.userId,
            roomName: text
        })
            .then(res => {
                setRoomCode(res.data?.code)
                getUserRooms()
            })
            .catch(err => console.log(err))
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={()=>{hideModal(); setRoomCode(null); setText('')}} contentContainerStyle={containerStyle}>
                {/* <UsersTable roomUsers={roomUsers} /> */}
                <Text variant="titleMedium" style={{ padding: 5 }}>Create room</Text>
                {roomCode == null ?
                    <>
                        <TextInput
                            mode="outlined"
                            label="Name"
                            keyboardType="default"
                            autoCapitalize={"none"}
                            outlineColor='black'
                            activeOutlineColor='black'
                            outlineStyle={{ backgroundColor: 'white' }}
                            value={text}
                            onChangeText={text => setText(text)}
                        />
                        <Button style={{ marginTop: 20 }} mode="contained" textColor="white" buttonColor='#738290' onPress={() => createRoom()}>
                            Create
                        </Button>
                    </>
                    :
                    <Text variant="displaySmall" style={{ padding: 5, textAlign: 'center' }}>Room code: {roomCode}</Text>
                }
            </Modal>
        </Portal>
    )
}

export default CreateRoomModal