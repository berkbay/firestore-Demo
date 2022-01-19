import React, {useEffect, useState, useLayoutEffect} from "react";
import {ActivityIndicator, Alert, TouchableWithoutFeedback, View} from "react-native";
import TaskForm from "../components/TaskForm";
import {deleteTask, findTask, updateTask} from "../db/firestore";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

const UpdateTask = () => {

    const navigation = useNavigation()
    // we change to page so we use useRoute for properties
    const route = useRoute()

    const [name, setName] = useState<undefined | string>(undefined)

    const { taskId } = route.params

    // delete documents
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableWithoutFeedback
                    onPress={() => {
                        // we add a question to avoid a wrong deletion
                        Alert.alert(
                            'Delete Task?',
                            name,
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(''),
                                    style: 'cancel'
                                },
                                {
                                    text: 'Delete',
                                    onPress: () =>
                                        deleteTask(taskId).then(() => navigation.navigate('Tasks')),
                                    style: 'destructive'
                                }
                            ]
                        )
                    }}
                >
                    <Ionicons
                        name={'ios-trash'}
                        size={35}
                        style={{marginRight:25}}
                        color={'#0080ff'}
                    />
                </TouchableWithoutFeedback>
            )
        })
    })

    // uptade here name,
    useEffect(() => {
        findTask(taskId)
            .then(task => setName(task.name))
            .catch(err => console.log(err))
    },[taskId])

    return (
        <View>
            {
                name
                    ? <TaskForm onSubmit={(values => {
                        updateTask(taskId, {
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
