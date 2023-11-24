import React, { useContext, useState } from 'react'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import UsersTable from './UsersTable';
import { Picker } from '@react-native-picker/picker';
import AuthContext from '../context/AuthContext';
import axios from 'axios'
import { BASE_URL } from '../../config'


const JoinRoomModal = ({ room, visible, showModal, hideModal, getUserRooms }) => {

    const [text, setText] = useState('')
    const { auth } = useContext(AuthContext)

    const containerStyle = { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20 };

    const joinRoom = async () => {
        await axios.post(BASE_URL + "/room/join-room", {
            userId: auth.userId,
            code: text
        })
            .then(res => {
                getUserRooms()
                hideModal()
            })
            .catch(err => console.log(err))
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                {/* <UsersTable roomUsers={roomUsers} /> */}
                <Text variant="titleMedium" style={{ padding: 5 }}>Join room</Text>
                <TextInput
                    mode="outlined"
                    label="Code"
                    keyboardType="default"
                    autoCapitalize={"none"}
                    outlineColor='black'
                    activeOutlineColor='black'
                    outlineStyle={{ backgroundColor: 'white' }}
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Button style={{ marginTop: 20 }} mode="contained" textColor="white" buttonColor='#738290' onPress={() => joinRoom()}>
                    Join class
                </Button>
            </Modal>
        </Portal>
    )
}

export default JoinRoomModal