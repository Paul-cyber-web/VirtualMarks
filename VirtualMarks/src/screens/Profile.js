import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ActivityIndicator, Avatar, List, Button } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { DataTable } from 'react-native-paper';



const Profile = () => {

    const { auth, logoutUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
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

    return (
        <>
            {loading == true ?
                <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', marginBottom: 100 }}>
                    <ActivityIndicator animating={true} color="#738290" />
                </View>
                :
                <ScrollView style={styles.container}>

                    <View style={styles.profileDetailsContainer}>
                        <Text style={styles.currentDay}>Paul Bunea</Text>
                        <Text style={{ color: "black" }}>Joined on {new Date().toDateString()}</Text>
                    </View>

                    <View style={{ padding: 15, paddingVertical: 20 }}>
                        <Button style={{ width: 120 }} mode="contained" textColor="white" buttonColor='#738290'>Join class</Button>
                    </View>

                    <View style={{ padding: 10, height: 320 }}>
                        <Text style={{ color: "black", fontSize: 17, paddingLeft: 12, paddingBottom: 20 }}>All my grades</Text>
                        <DataTable>
                            <ScrollView>
                                <DataTable.Header>
                                    <DataTable.Title>Subject</DataTable.Title>
                                    <DataTable.Title>Date</DataTable.Title>
                                    <DataTable.Title numeric>Grade</DataTable.Title>
                                </DataTable.Header>

                                {items.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{item.subject}</DataTable.Cell>
                                        <DataTable.Cell>{item.date}</DataTable.Cell>
                                        <DataTable.Cell numeric>{item.grade}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </ScrollView>

                        </DataTable>
                    </View>

                    <View style={{ paddingTop: 70 }}>
                        <List.Item style={{ padding: 15 }} onPress={logoutUser} title="Logout" titleStyle={{ color: "#FF5C56", fontWeight: "600" }} right={() => <Feather name="log-out" color="#FF5C56" size={24} />} />
                    </View>


                </ScrollView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },

    profileDetailsContainer: {
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