import React, { useContext, useState } from 'react';
import { DataTable, Button, Tooltip, Chip, ActivityIndicator } from 'react-native-paper';
import { ScrollView, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { IconButton, MD3Colors } from 'react-native-paper';
import { BASE_URL } from '../../config';
import AuthContext from '../context/AuthContext';
import axios from 'axios';


const UsersTable = ({ roomUsers, roomId, currentUser, loading }) => {



    const removeUser = async (user) => {
        // removedUser, currentUser, roomId
        console.log(user, currentUser, roomId)
        await axios.post(BASE_URL + "/room/remove-room-users", {
            removedUser: user,
            currentUser: currentUser,
            roomId: roomId
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <DataTable>
            <ScrollView>
                {loading == true ?
                    <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', marginVertical: 50 }}>
                        <ActivityIndicator animating={true} color="#738290" />
                    </View>
                    :
                    <>
                        <DataTable.Header>
                            <DataTable.Title>User</DataTable.Title>
                            <DataTable.Title>Remove</DataTable.Title>
                        </DataTable.Header>

                        {roomUsers.map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{item.username}</DataTable.Cell>
                                <DataTable.Cell>
                                    <IconButton
                                        icon={() => (<AntDesign name="delete" size={24} color="black" />)}
                                        size={20}
                                        onPress={() => removeUser(item._id)}
                                    />
                                    {/* <Button mode="contained" buttonColor='red' textColor='white'>Remove</Button> */}
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </>
                }
            </ScrollView>

        </DataTable>
    );
};

export default UsersTable;