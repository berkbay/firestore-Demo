import {StyleSheet, Text, TouchableOpacity} from "react-native";
import CheckBox from "./CheckBox";
import React, {FC} from "react";
import {TaskType} from "../Types";
import db from "../db/firestore";
import {useNavigation} from "@react-navigation/native";

type Props = {
    item: TaskType
}

const TaskItem: FC<Props> = ({item}: Props) => {

    const navigation = useNavigation()

    const uptadeTask = (taskId, isChecked) => {
        return db.collection('tasks').doc(taskId).update({
            completedAt: isChecked ? new Date() : null
        })
    }

    return(
        <TouchableOpacity onPress={ () => navigation.navigate('UpdateTask', {taskId: item.id}) } style={styles.taskItem}>
            <Text>{item.name}</Text>
            <CheckBox
                value={!!item.completedAt}
                onValueChange={(isChecked) => uptadeTask(item.id, isChecked)} />
        </TouchableOpacity>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
    }
})
