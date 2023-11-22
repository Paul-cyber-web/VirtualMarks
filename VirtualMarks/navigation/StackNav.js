import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../src/authentication/Login";
import Register from "../src/authentication/Register";

const Stack = createStackNavigator();

export default function StackNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#738290" }, headerTitleStyle:{fontWeight:"bold"}, headerTintColor: "white" }}>
            <Stack.Screen options={{title:"Sign in"}} name="Login" component={Login} />
            <Stack.Screen options={{title:"Register"}} name="Register" component={Register} />
        </Stack.Navigator>
    );
}