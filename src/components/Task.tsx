import React, {FC} from "react";
import {View, Text, StyleSheet} from "react-native";
import CheckBox from "./CheckBox";

const Tasks:FC = () => {
    return (
        <View>
            <View style={styles.taskItem}>
                <Text>Life Weights</Text>
                <CheckBox value={true}/>
            </View>
            <View style={styles.taskItem}>
                <Text>Eat Well</Text>
                <CheckBox value={false}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
    }
})

export default Tasks;
