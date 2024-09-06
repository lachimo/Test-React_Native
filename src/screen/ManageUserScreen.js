import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ManageUserScreen = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [updateFullName, setUpdateFullName] = useState("");
    const [updateUserName, setUpdateUserName] = useState("");
    const [updateDob, setUpdateDob] = useState("");
    const [updateImage, setUpdateImage] = useState("");
    const [updateIsStudent, setUpdateIsStudent] = useState(false);

    // call API
    const fetchData = () => {
        fetch("https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        fetchData();
    }, []);

    // handle edit
    const handleEdit = (user) => {
        setSelectedUser(user);
        setUpdateFullName(user.fullname);
        setUpdateUserName(user.username);
        setUpdateDob(user.dob);
        setUpdateImage(user.image);
        setUpdateIsStudent(user.isStudent);
        setIsModalVisible(true);
    };

    // handle submit modal
    const handleUpdateUser = () => {
        const updateUser = {
            fullname: updateFullName,
            username: updateUserName,
            dob: updateDob,
            image: updateImage,
            isStudent: updateIsStudent,
        };

        fetch(
            `https://66d66d05006bfbe2e64d6982.mockapi.io/api/v1/user/${selectedUser.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateUser),
            }
        )
            .then((res) => res.json())
            .then(() => {
                fetchData();
                setIsModalVisible(false);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Failed to update");
            });
    };

    // renderItem
    const renderItem = ({ item }) => {
        return (
            <View style={styles.userRow}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text>{item.fullname}</Text>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
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

            {/* Modal update user */}
            {selectedUser && (
                <Modal
                    visible={isModalVisible}
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <TextInput
                            value={updateFullName}
                            onChangeText={setUpdateFullName}
                            placeholder={selectedUser.fullname}
                            style={styles.input}
                        />
                        <TextInput
                            value={updateUserName}
                            onChangeText={setUpdateUserName}
                            placeholder={selectedUser.username}
                            style={styles.input}
                        />
                        <TextInput
                            value={updateDob}
                            onChangeText={setUpdateDob}
                            placeholder={selectedUser.dob}
                            style={styles.input}
                        />
                        <TextInput
                            value={updateImage}
                            onChangeText={setUpdateImage}
                            placeholder={selectedUser.image}
                            style={styles.input}
                        />
                        <View style={styles.switchContainer}>
                            <Text>Is Student: </Text>
                            <Switch
                                value={updateIsStudent}
                                onValueChange={setUpdateIsStudent}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Submit" onPress={handleUpdateUser} />
                            <Button
                                title="Cancel"
                                onPress={() => setIsModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                    navigation.navigate("Create User", { fetchData })
                }
            >
                <Icon name="plus" size={20} color="black" />
            </TouchableOpacity>
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
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",
        maxWidth: 50,
        backgroundColor: "#ffcef6",
        borderRadius: 50,
        padding: 15,
        marginBottom: 10,
    },
    modalContent: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent :"center",   
        gap: 15,
    },
});
