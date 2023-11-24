import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../Home';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from '../src/screens/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#738290" }, headerTitleStyle: { fontWeight: "bold" }, headerTintColor: "white" }}>
            {/* <Tab.Screen
                name="VirtualMarks"
                component={Home}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarActiveBackgroundColor: "white",
                    tabBarInactiveBackgroundColor: 'white',
                    tabBarLabel: 'Home',
                    tabBarInactiveTintColor: '#738290',
                    tabBarActiveTintColor: "#4a535c",
                    tabBarLabelStyle: { padding: 1, fontWeight: "bold" },
                    tabBarIconStyle: { fontWeight: "bold" },
                    tabBarIcon: ({ color }) => (
                        <Feather style={{ fontWeight: "bold" }} name="home" size={24} color={color} />
                    ),
                }} /> */}

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarActiveBackgroundColor: "white",
                    tabBarInactiveBackgroundColor: 'white',
                    tabBarLabel: 'Profile',
                    tabBarInactiveTintColor: '#738290',
                    tabBarActiveTintColor: "#4a535c",
                    tabBarLabelStyle: { padding: 1, fontWeight: "bold" },
                    tabBarIconStyle: { fontWeight: "bold" },
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    );
}