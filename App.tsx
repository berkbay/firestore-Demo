import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import CreateTask from "./src/screens/CreateTask";
import {TouchableWithoutFeedback} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import UpdateTask from "./src/screens/UpdateTask";

export default function App() {
    const Stack = createNativeStackNavigator();
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tasks"
                    component={Home}
                    options={({navigation}) => ({
                        headerRight: () => (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateTask')}>
                                <Ionicons
                                    name={'ios-add'}
                                    size={34}
                                    color={'#0080ff'}
                                    style={{marginRight:25}} />
                            </TouchableWithoutFeedback>
                        )
                    })}
                />
                <Stack.Screen name="CreateTask" component={CreateTask}/>
                <Stack.Screen name="UpdateTask" component={UpdateTask}/>
            </Stack.Navigator>
        </NavigationContainer>
  );
}


