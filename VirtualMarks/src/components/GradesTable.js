import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native'

const GradesTable = () => {

    const [items] = React.useState([
        {
            key: 1,
            date: new Date('2023-10-12').toDateString(),
            grade: 10,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            grade: 8,
        },

        {
            key: 1,
            date: new Date('2023-11-22').toDateString(),
            grade: 7,
        },
        {
            key: 1,
            date: new Date('2023-11-23').toDateString(),
            grade: 3,
        },

    
    ]);


    return (
        <DataTable>
            <ScrollView>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title numeric>Grade</DataTable.Title>
                </DataTable.Header>

                {items.map((item, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.date}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.grade}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </ScrollView>

        </DataTable>
    );
};

export default GradesTable;