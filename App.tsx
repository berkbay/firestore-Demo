import {StyleSheet, View} from 'react-native';
import Home from "./src/screens/Home";

const App = ()=> {
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default App;
