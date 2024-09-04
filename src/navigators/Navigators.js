import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import HomeScreen from "../screen/HomeScreen";
import ManageUserScreen from "../screen/ManageUserScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserDetailScreen from "../screen/UserDetailScreen";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const BottomTabNav = () => {
        return (
            <BottomTab.Navigator>
                <BottomTab.Screen name="Home" component={HomeScreen} />
                <BottomTab.Screen
                    name="Manage User"
                    component={ManageUserScreen}
                />
            </BottomTab.Navigator>
        );
    };

    return (
        // <Stack.Navigator screenOptions={{ headerShown: false }}>
        //     {!isLoggedIn ? (
        //         <Stack.Screen name="Login" options={{ headerShown: false }}>
        //             {(props) => (
        //                 <LoginScreen
        //                     {...props}
        //                     onLoginSuccess={handleLoginSuccess}
        //                 />
        //             )}
        //         </Stack.Screen>
        //     ) : (
        //         <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
        //     )}
        // </Stack.Navigator>

        <Stack.Navigator>
            <Stack.Screen
                name="BottomTabNav"
                component={BottomTabNav}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="User Detail" component={UserDetailScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
