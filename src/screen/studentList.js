
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { createStudent, deleteStudent, updateStudent, getAllStudent } from './../database/databaseMethod';

const studentList = (props) => {

    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        getStudentList();
    }, [])

    const onAddStudent = (payload) => {
        createStudent(payload);
        getStudentList();
        Alert.alert("Student Added Successfully.");
    }

    const onDeleteStudent = (id) => {
        deleteStudent(id);
        getStudentList();
        Alert.alert("Record Deleted Successfully.");
    }

    const onEditStudent = (payload) => {
        updateStudent(payload);
        getStudentList();
        Alert.alert("Student Updated Successfully.");
    }

    const getStudentList = async () => {
        await getAllStudent().then((res) => {
            let studentRes = JSON.parse(JSON.stringify(res));
            console.log('sss', studentRes);
            setStudentList(studentRes);
        });
    }

    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => props.navigation.navigate('StudentForm', { onAddStudent: (student) => onAddStudent(student), editAble: false })}>
                <Text style={styles.textView}>Add Student</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.viewMargin}
                data={studentList}
                extraData={studentList}
                keyExtractor={studentList => studentList.student_id}
                renderItem={({ item, index }) => (
                    <View key={index} style={{ justifyContent: 'center', padding: 5, marginBottom: 10, borderRadius: 5, borderWidth: 1 }}>
                        <Text>Student Id : {item.student_id}</Text>
                        <Text>Student Name : {item.student_name}</Text>
                        <Text>Student Class : {item.student_class}</Text>
                        <Text>Student Subject : {item.student_subject}</Text>
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                style={[styles.editBtn, { marginRight: 10 }]}
                                onPress={() => props.navigation.navigate('StudentForm', { onEditStudent: (student) => onEditStudent(student), editAble: true, item })}>
                                <Text style={styles.textView}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => onDeleteStudent(item.student_id)}>
                                <Text style={styles.textView}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flatList: {

    },
    viewMargin: {
        marginTop: 10
    },
    btnView: {
        flexDirection: 'row',
        marginTop: 10
    },
    editBtn: {
        flex: 0.5,
        backgroundColor: '#5b76f0',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#5b76f0',
        borderRadius: 5,
        borderWidth: 1

    },
    deleteBtn: {
        flex: 0.5,
        backgroundColor: '#f05b5b',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f05b5b',
        borderRadius: 5,
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#5b76f0',
        padding: 10,
        height: 40,
        borderColor: '#5b76f0',
        borderRadius: 5,
        borderWidth: 1
    },
    textView: {
        color: 'white',
    }
});

export default studentList;