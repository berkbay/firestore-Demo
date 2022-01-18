import React, {FC, useEffect, useState} from "react";
import {View} from "react-native";
import {getTasks} from "../db/firestore";
import {TaskType} from "../Types";
import TaskItem from "./TaskItem";

const Tasks:FC = () => {

    const [ tasks, setTasks ] = useState<TaskType[]>()

    useEffect(() => {
        getTasks().then(tasks => setTasks(tasks))
    },[])

    return (
        <View>
            {
                tasks?.map(task => <TaskItem key={task.id} item={task}/>)
            }
        </View>
    );
};



export default Tasks;
