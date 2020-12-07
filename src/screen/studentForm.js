
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const studentForm = (props) => {

    const [, setState] = useState();
    const [editAble, setEditAble] = useState();
    const [studentId, setStudentId] = useState();
    const [studentName, setStudentName] = useState();
    const [studentClass, setStudentClass] = useState();
    const [studentSubject, setStudentSubject] = useState();

    useEffect(() => {
        const { params } = props.route;
        if (params && params.editAble) {
            setStudentId(params.item.student_id);
            setStudentName(params.item.student_name);
            setStudentClass(params.item.student_class);
            setStudentSubject(params.item.student_subject);
        }
        setEditAble(params.editAble);
    }, [])

    const handleStudentName = (text) => {
        setStudentName(text);
    }

    const handleStudentClass = (text) => {
        setStudentClass(text);
    }

    const handleStudentSubject = (text) => {
        setStudentSubject(text);
    }

    const onAddStudent = () => {
        if (studentName && studentClass && studentSubject) {
            var randomNumber =Math.floor(Math.random() * Math.floor(1000)) + 1;
            console.log('randomNumber',randomNumber)
            let student = {
                student_id: randomNumber, student_name: studentName, student_class: studentClass, student_subject: studentSubject, created_by: new Date()
            }
            props.route.params && props.route.params.onAddStudent(student);
            props.navigation.goBack();
        } else {
            alert('Please all fields required')
        }
    }

    const onEditStudent = () => {
        if (studentName && studentClass && studentSubject) {
            let student = {
                student_id: studentId, student_name: studentName, student_class: studentClass, student_subject: studentSubject, created_by: new Date()
            }
            props.route.params && props.route.params.onEditStudent(student);
            props.navigation.goBack();
        } else {
            alert('Please all fields required')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter Student name"
                placeholderTextColor="#5b76f0"
                autoCapitalize="none"
                value={studentName}
                onChangeText={(text) => handleStudentName(text)} />

            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter Student Class"
                placeholderTextColor="#5b76f0"
                autoCapitalize="none"
                value={studentClass}
                onChangeText={(text) => handleStudentClass(text)} />

            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter Student Subject"
                placeholderTextColor="#5b76f0"
                autoCapitalize="none"
                value={studentSubject}
                onChangeText={(text) => handleStudentSubject(text)} />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => editAble ? onEditStudent() : onAddStudent()}>
                <Text style={styles.submitButtonText}>{editAble ? 'Edit' : 'Add'} Student</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    input: {
        margin: 15,
        height: 40,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#5b76f0',
    },
    submitButton: {
        backgroundColor: '#5b76f0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});

export default studentForm;