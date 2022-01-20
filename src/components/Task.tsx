import React, {FC, useCallback, useState} from "react";
import {FlatList, View} from "react-native";
import {DocumentSnapshot, getPaginatedTasks, mapDocToTask,} from "../db/firestore";
import TaskItem from "./TaskItem";
import {useFocusEffect} from "@react-navigation/native";

const Tasks:FC = () => {

    const [ snapshots, setSnapshots ] = useState<DocumentSnapshot[]>([])


    function getLastItem<T>(arr: T[]): T | undefined {
        return arr.slice(-1)[0];
    }

    const fetchMore = () => {
        console.log('fecthMore called')
        void getPaginatedTasks(getLastItem(snapshots), 20).then((newSnapshots) =>
            setSnapshots(snapshots.concat(newSnapshots.docs))
        );
    };

    const refresh = () => {
        void getPaginatedTasks(undefined, 20).then((newSnapshots) =>
            setSnapshots(newSnapshots.docs)
        );
    }

    useFocusEffect(
        useCallback(() => {
            refresh()
        }, [])
    )

    return (
        <View style={{flex:1}}>
            <FlatList
                data={snapshots.map(mapDocToTask)}
                onEndReachedThreshold={0}
                onEndReached={() => fetchMore()}
                renderItem={({item}) => <TaskItem key={item.id} item={item}/>}
            />
        </View>
    );
};

export default Tasks;

