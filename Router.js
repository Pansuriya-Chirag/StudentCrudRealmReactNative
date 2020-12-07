
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentList from './src/screen/studentList';
import StudentForm from './src/screen/studentForm';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StudentList">
                <Stack.Screen name="StudentList" component={StudentList} />
                <Stack.Screen name="StudentForm" component={StudentForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;