import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { ScrollView, View } from 'react-native'
import axios from 'axios';
import { BASE_URL } from '../../config';
import AuthContext from '../context/AuthContext';

const GradesTable = ({ userId, roomId }) => {

    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserGrades = async () => {
        console.log(userId, roomId._id)
        await axios.post(BASE_URL + '/mark/get-user-marks', {
            userId: userId,
            roomId: roomId._id
        })
            .then((res) => {
                setGrades(res.data.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserGrades()
    }, [])


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
                            <DataTable.Title>Date</DataTable.Title>
                            <DataTable.Title numeric>Grade</DataTable.Title>
                        </DataTable.Header>

                        {grades?.length > 0 && grades.map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{new Date(item.created_at).toDateString()}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.score}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </>
                }
            </ScrollView>

        </DataTable>
    );
};

export default GradesTable;