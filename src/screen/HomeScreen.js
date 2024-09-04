import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
    ActionSheetIOS,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { capitalize } from "../utils/utils";

const HomeScreen = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("all");
    const [filteredUsers, setFilteredUsers] = useState([]);

    // call API
    useEffect(() => {
        fetch("https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setFilteredUsers(data); // cập nhật state "filteredUsers"
            })
            .catch((error) => console.log(error));
    }, []);

    // FlatList render
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.fullname}</Text>
                <Text>{item.username}</Text>
                <Text>{item.dob}</Text>
                <Text>{item.isStudent ? "Student" : "Not a student"}</Text>
            </View>
        </TouchableOpacity>
    );

    // Filter
    const handelFilterChange = (value) => {
        setFilter(value);
        if (value === "student") {
            setFilteredUsers(users.filter((user) => user.isStudent));
        } else {
            setFilteredUsers(users);
        }
    };

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel", "Student", "All"],
                title: "Filter",
                cancelButtonIndex: 0, // chỉ số nút hủy có trong options
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    handelFilterChange("student");
                } else if (buttonIndex === 2 || buttonIndex === 0) {
                    handelFilterChange("all");
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            {Platform.OS === "android" ? (
                <Picker
                    selectedValue={filter}
                    style={styles.picker}
                    onValueChange={(itemValue) => handelFilterChange(itemValue)}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Student" value="student" />
                </Picker>
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={showActionSheet}
                >
                    <Text>Filter: {capitalize(filter)}</Text>
                </TouchableOpacity>
            )}

            <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    picker: {
        height: 50,
        width: "100%",
    },
    button: {
        marginTop: 30,
        paddingVertical: 20,
        backgroundColor: "#ddd",
        alignItems: "center",
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
        padding: 10,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        elevation: 3,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
    },
});
