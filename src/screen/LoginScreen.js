import React, { useState } from "react";
import {
    View,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";

const LoginScreen = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch(
                "https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user"
            );
            const users = await response.json();
            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                // console.log("Login successfully");
                // Alert.alert("Login success");
                onLoginSuccess();
            } else {
                Alert.alert("Login failed", "Invalid username or password");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something wrong");
        }
    };
    return (
        <View style={styles.viewContainer}>
            <TextInput
                style={styles.inputText}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.inputText}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    viewContainer: {
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingTop: 50,
        rowGap: 15,
    },
    inputText: {
        height: 50,
        borderColor: "#ffcef6",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#ffcef6",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
});
