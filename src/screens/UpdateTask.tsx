import React, {useEffect, useState} from "react";
import {ActivityIndicator, View} from "react-native";
import TaskForm from "../components/TaskForm";
import db from "../db/firestore";
import {useNavigation, useRoute} from "@react-navigation/native";

const UpdateTask = () => {

    const navigation = useNavigation()
    // we change to page so we use useRoute for properties
    const route = useRoute()
    const [name, setName] = useState<undefined | string>(undefined)

    const { taskId } = route.params

    // uptade here name,
    useEffect(() => {
        db.collection('tasks')
            .doc(taskId)
            .get()
            .then(doc => {
                if (doc) {
                    const name = doc.data()?.name
                    setName(name)
                }else{
                    throw new Error('item-does-not-exist')
                }
            })
    },[taskId])

    return (
        <View>
            {
                name
                    ? <TaskForm onSubmit={(values => {
                        db.collection('tasks').doc(taskId).update({
                            name: values.name
                        }).then(result => navigation.navigate('Tasks'))
                            .catch(err => console.log(err))
                    })} name={name} btnValue={'Uptade'}/>
                    : <ActivityIndicator size={'large'} />
            }
        </View>
    );
}

export default UpdateTask;
