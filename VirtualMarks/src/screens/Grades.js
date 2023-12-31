import React from 'react'
import { ScrollView } from 'react-native'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import GradesTable from '../components/GradesTable';

const Grades = ({ visible, showModal, hideModal, roomId, userId }) => {

    const containerStyle = { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20 };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <GradesTable roomId={roomId} userId={userId}/>
            </Modal>
        </Portal>
    )
}

export default Grades