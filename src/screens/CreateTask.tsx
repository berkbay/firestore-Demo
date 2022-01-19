import React from "react";
import {View} from "react-native";
import db from "../db/firestore";
import {useNavigation} from "@react-navigation/native";
import TaskForm from "../components/TaskForm";


const CreateTask = () => {

    const navigation = useNavigation()

    return (
        <View>
            <TaskForm onSubmit={(values => {
                db.collection('tasks').add({
                    name: values.name,
                    createdAt: new Date(),
                    completedAt: null
                }).then(result => navigation.navigate('Tasks'))
                    .catch(err => console.log(err))
            })} name={''} btnValue={'Create'}/>
        </View>
    );
}

export default CreateTask;
