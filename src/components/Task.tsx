import React, {FC, useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import CheckBox from "./CheckBox";
import db from "../db/firestore";

type TaskType = {
    id: string,
    name: string,
    createdAt: Date,
    completedAt: Date
}

const Tasks:FC = () => {

    const [tasks, setTasks] = useState<TaskType[]>()

    useEffect(() => {
        db.collection('tasks')
            .get()
            .then((result) => result.docs)
            .then(docs => docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                createdAt: doc.data().createdAt,
                completedAt: doc.data().completedAt
            })))
            .then(tasks => setTasks(tasks))
    },[])


    return (
        <View>
            {
                tasks?.map(task => <View key={task.id} style={styles.taskItem}>
                    <Text>{task.name}</Text>
                    <CheckBox value={!!task.completedAt} />
                </View>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
    }
})

export default Tasks;
