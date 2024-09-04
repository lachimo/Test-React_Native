import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ManageUserScreen = () => {
    const [users, setUsers] = useState([]);
    // call API
    useEffect(() => {
        const fetchData = () => {
            fetch("https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user")
                .then((res) => res.json())
                .then((data) => setUsers(data))
                .catch((error) => console.log(error));
        };
        fetchData();
    }, []);

    // renderItem
    const renderItem = ({ item }) => {
        return (
            <View style={styles.userRow}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text>{item.fullname}</Text>
                <View style={styles.icons}>
                    <TouchableOpacity>
                        <Icon name="edit" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // handle Delete
    const handleDelete = (id) => {
        fetch(`https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    setUsers(users.filter((user) => user.id != id));
                } else {
                    console.log("Failed to delete user");
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default ManageUserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    userRow: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 25,
    },
    icons: {
        flexDirection: "row",
        gap: 10,
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "blue",
        borderRadius: 50,
        padding: 15,
    },
});
