import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CheckBox from "./CheckBox";
import React, {FC} from "react";
import {TaskType} from "../Types";
import {updateTask} from "../db/firestore";
import {useNavigation} from "@react-navigation/native";

type Props = {
    item: TaskType
}

const TaskItem: FC<Props> = ({item}: Props) => {

    const navigation = useNavigation()
    const isCompleted = !!item.completedAt
    const completedStyle = isCompleted ? styles.completed : {}

    return(
        <TouchableOpacity
            onPress={() => navigation.navigate('UpdateTask', {taskId: item.id})}
        >
            <View style={{...styles.taskItem, ...completedStyle}}>
                <Text style={isCompleted && styles.completedText}>{item.name}</Text>
                <CheckBox
                    value={!!item.completedAt}
                    onValueChange={(isChecked) => updateTask(item.id, {
                        completedAt: isChecked ? new Date() : null
                    })}/>
            </View>
        </TouchableOpacity>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
        borderWidth: 2,
        marginTop: 15,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: 325,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    completed: {
        opacity: 0.4
    },
    completedText: {
        textDecorationLine: 'line-through'
    }
})
