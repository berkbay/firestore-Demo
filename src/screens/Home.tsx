import React, {FC} from "react";
import {StyleSheet, View} from 'react-native';
import Tasks from "../components/Task";

const Home: FC = () => (
    <View style={styles.container} >
        <Tasks/>
    </View>
);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;
