import {StyleSheet, Text, View} from "react-native";
import CheckBox from "./CheckBox";
import React, {FC} from "react";
import {TaskType} from "../Types";

type Props = {
    item: TaskType
}

const TaskItem: FC<Props> = ({item}: Props) => {
    return(
        <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <CheckBox value={!!item.completedAt} />
        </View>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
    }
})
