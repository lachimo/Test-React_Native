import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

const UserScreen = ({ route }) => {
    const { fetchData } = route.params;
    const [fullname, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const navigation = useNavigation();

    const handleCreateUser = () => {
        const newUser = {
            fullname,
            dob,
            username,
            password,
            image,
            isStudent,
        };

        fetch("https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then(() => {
                Alert.alert("User created successfully");
                fetchData();
                navigation.goBack();
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Failed to created user");
            });
    };
    return (
        <View style={styles.container}>
            <TextInput
                value={fullname}
                onChangeText={setFullName}
                placeholder="Full Name"
                style={styles.input}
            />
            <TextInput
                value={dob}
                onChangeText={setDob}
                placeholder="Date of Birth"
                style={styles.input}
            />
            <TextInput
                value={username}
                onChangeText={setUserName}
                placeholder="User Name"
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                style={styles.input}
            />
            <TextInput
                value={image}
                onChangeText={setImage}
                placeholder="Image URL"
                style={styles.input}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Is student: </Text>
                <Switch value={isStudent} onValueChange={setIsStudent} />
            </View>

            <Button title="Add" onPress={handleCreateUser} />
        </View>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 15,
        padding: 10,
        height: 40,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#ffcef6",
    },

    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    switchText: {},
});
