import {StyleSheet, Text, View} from "react-native";
import CheckBox from "./CheckBox";
import React, {FC} from "react";
import {TaskType} from "../Types";
import db from "../db/firestore";

type Props = {
    item: TaskType
}

const TaskItem: FC<Props> = ({item}: Props) => {

    const uptadeTask = (taskId, isChecked) => {
        return db.collection('tasks').doc(taskId).update({
            completedAt: isChecked ? new Date() : null
        })
    }

    return(
        <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <CheckBox
                value={!!item.completedAt}
                onValueChange={(isChecked) => uptadeTask(item.id, isChecked)} />
        </View>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
    }
})
