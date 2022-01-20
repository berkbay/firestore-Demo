import React, {FC, useEffect, useState} from "react";
import {View} from "react-native";
import {streamTasks} from "../db/firestore";
import {TaskType} from "../Types";
import TaskItem from "./TaskItem";

const Tasks:FC = () => {

    const [ tasks, setTasks ] = useState<TaskType[]>()

    const mapDocToTask = (document): TaskType => {
        return {
            id: document.id,
            name: document.data().name,
            createdAt: document.data().createdAt,
            completedAt: document.data().completedAt,
        }
    }

    useEffect(() => {
        const unsubscribe =  streamTasks({
            next: querySnapshot => {
                const tasks = querySnapshot.docs.map(docSnapshot => mapDocToTask(docSnapshot))
                setTasks(tasks)
            },
            error: (error) => console.log(error)
        })
        return unsubscribe
    },[setTasks])

    return (
        <View>
            {
                tasks?.map(task => <TaskItem key={task.id} item={task}/>)
            }
        </View>
    );
};

export default Tasks;

