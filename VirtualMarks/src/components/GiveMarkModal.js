import React, { useState } from 'react'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import UsersTable from './UsersTable';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native'
import axios from 'axios';
import { BASE_URL } from '../../config';

const GiveMarkModal = ({ roomUsers, roomId, currentUser, visible, showModal, hideModal }) => {

    const [selected, setSelected] = useState();
    const [text, setText] = useState('')
    const containerStyle = { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20 };

    const returnGrade = async () => {
        await axios.post(BASE_URL + "/mark/create-mark",{
            // const { mark, userId, roomId } = req.body
            mark: parseFloat(text),
            userId:selected,
            roomId:roomId
        })
        .then(res=>{
            console.log(res.data)
            hideModal()
        })
        .catch(err=>console.log(err))
    }


    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                {/* <UsersTable roomUsers={roomUsers} /> */}
                <ScrollView>
                    <Text style={{ padding: 5, color: 'gray' }}>Grade</Text>
                    <TextInput
                        enablesReturnKeyAutomatically
                        mode="outlined"
                        label="Grade"
                        keyboardType="decimal-pad"
                        outlineColor='black'
                        activeOutlineColor='black'
                        outlineStyle={{ backgroundColor: 'white' }}
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                    <Text style={{ padding: 5, color: 'gray' }}>Choose student</Text>
                    <Picker
                        selectedValue={selected}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelected(itemValue)
                        }>
                        {roomUsers?.map((item, index) => (
                            <Picker.Item key={index} label={item.username} value={item._id} />
                        ))}
                    </Picker>
                    <Button style={{ marginTop: 20 }} mode="contained" textColor="white" buttonColor='#738290' onPress={() => returnGrade()}>
                        Return
                    </Button>
                </ScrollView>
            </Modal>
        </Portal>
    )
}

export default GiveMarkModal