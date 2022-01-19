import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import CreateTask from "./src/screens/CreateTask";
import UpdateTask from "./src/screens/UpdateTask";
import HeaderRightButton from "./src/components/HeaderRightButton";

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
                            <HeaderRightButton
                                onPress={() => navigation.navigate('CreateTask')}
                                icon={"add"}/>
                        )
                    })}
                />
                <Stack.Screen name="CreateTask" component={CreateTask}/>
                <Stack.Screen name="UpdateTask" component={UpdateTask}/>
            </Stack.Navigator>
        </NavigationContainer>
  );
}


