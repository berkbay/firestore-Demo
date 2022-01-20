import React, {FC} from "react";
import {StyleSheet, SafeAreaView} from 'react-native';
import Tasks from "../components/Task";

const Home: FC = () => (
    <SafeAreaView style={styles.container} >
        <Tasks/>
    </SafeAreaView>
);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
    },
});

export default Home;
