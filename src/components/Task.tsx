import React, {FC, useCallback,useState} from "react";
import {FlatList, View} from "react-native";
import {DocumentSnapshot, getPaginatedTasks, mapDocToTask, streamTasks} from "../db/firestore";
import {TaskType} from "../Types";
import TaskItem from "./TaskItem";
import {useFocusEffect} from "@react-navigation/native";

const Tasks:FC = () => {

    const [ snapshots, setSnapshots ] = useState<DocumentSnapshot[]>([])
    const [isRefreshing, setRefreshing] = useState<boolean>(false);

    // useEffect(() => {
    //     const unsubscribe =  streamTasks({
    //         next: (querySnapshot) => {
    //             const tasks = querySnapshot.docs.map((docSnapshot) =>
    //                     mapDocToTask(docSnapshot),
    //                 );
    //             setTasks(tasks)
    //         },
    //         error: (error) => console.log(error)
    //     });
    //     return unsubscribe
    // },[setTasks]);

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
        setRefreshing(true);
        void getPaginatedTasks(undefined, 20).then((newSnapshots) => {
            setSnapshots(newSnapshots.docs)
            setRefreshing(false)
        });
    }

    useFocusEffect(
        useCallback(() => {
            refresh()
        }, [])
    )

    const onChecked = useCallback(() => {
        refresh()
    }, [])

    return (
        <View style={{flex:1}}>
            <FlatList
                data={snapshots.map(mapDocToTask)}
                extraData={snapshots.map(mapDocToTask)}
                onEndReachedThreshold={0}
                onRefresh={refresh}
                refreshing={isRefreshing}
                onEndReached={() => fetchMore()}
                renderItem={({item}) => <TaskItem key={item.id} item={item} onChecked={onChecked}/>}
            />
        </View>
    );
};

export default Tasks;

