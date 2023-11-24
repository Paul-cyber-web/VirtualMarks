import React from 'react'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import UsersTable from './UsersTable';

const StudentsModal = ({ roomUsers, roomId, currentUser, visible, showModal, hideModal, loading }) => {


    const containerStyle = { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20 };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <UsersTable loading={loading} roomUsers={roomUsers} roomId={roomId} currentUser={currentUser} />
            </Modal>
        </Portal>
    )
}

export default StudentsModal