import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#FF5C56" }, headerTitleStyle: { fontWeight: "bold" }, headerTintColor: "white" }}>
            <Tab.Screen
                name="VirtualMarks"
                component={Home}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarActiveBackgroundColor: "white",
                    tabBarInactiveBackgroundColor: 'white',
                    tabBarLabel: 'Home',
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: "#FF5C56",
                    tabBarLabelStyle: { padding: 1, fontWeight: "bold" },
                    tabBarIconStyle: { fontWeight: "bold" },
                    tabBarIcon: ({ color }) => (
                        <Feather style={{ fontWeight: "bold" }} name="home" size={24} color={color} />
                    ),
                }} />

            {/* <Tab.Screen
                name="Workouts"
                component={Workouts}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarActiveBackgroundColor: "white",
                    tabBarInactiveBackgroundColor: 'white',
                    tabBarLabel: 'Workouts',
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: "#FF5C56",
                    tabBarLabelStyle: { padding: 1, fontWeight: "bold" },
                    tabBarIconStyle: { fontWeight: "bold" },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="kettle-outline" size={24} color={color} />
                    ),
                }} />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarActiveBackgroundColor: "white",
                    tabBarInactiveBackgroundColor: 'white',
                    tabBarLabel: 'Profile',
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: "#FF5C56",
                    tabBarLabelStyle: { padding: 1, fontWeight: "bold" },
                    tabBarIconStyle: { fontWeight: "bold" },
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                }} /> */}
        </Tab.Navigator>
    );
}