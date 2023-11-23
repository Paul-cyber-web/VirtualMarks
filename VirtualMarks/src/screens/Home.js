import React, { useContext, useState } from 'react'
import { ScrollView, View } from 'react-native'
import AuthContext from '../context/AuthContext'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Grades from './Grades';

const colors = [
    "#A9A9A9",
    "#508D69",
    "#FF9130",
    "#FF5B22"

    // "#FF8F8F",
    // "#EEF296",
    // "#9ADE7B",
    // "#508D69"
]

const Home = ({ navigation }) => {

    const [rooms, setRooms] = useState([
        'Maths',
        'History',
        'Programming',
        'English'
    ])
    const { auth } = useContext(AuthContext)

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleCardPress = (subject) => {
        showModal()
    }

    return (
        <ScrollView>
            {rooms.length > 0 && rooms.map((item, index) => (
                <Card key={index} style={{ margin: 10, backgroundColor: colors[index], paddingVertical: 10 }}>
                    <Card.Content>
                        <Text style={{ color: 'white', fontWeight: "bold" }} variant="titleLarge">{item}</Text>
                        <Text style={{ color: 'white' }} variant="bodyMedium">Prof.</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => { handleCardPress(item) }} mode="contained" textColor="black" buttonColor='white' labelStyle={{ fontWeight: "bold" }}>Grades</Button>
                    </Card.Actions>
                </Card>
            ))}
            <Grades visible={visible} showModal={showModal} hideModal={hideModal}/>
        </ScrollView>
    )
}

export default Home