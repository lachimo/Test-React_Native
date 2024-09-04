import { Image, StyleSheet, Text, View } from "react-native";

const UserDetailScreen = ({ route }) => {
    const { user } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.image }} style={styles.image} />
            <Text style={styles.fullname}>Full Name: {user.fullname}</Text>
            <Text style={styles.username}>User Name: {user.username}</Text>
            <Text style={styles.dob}>Date of Birth: {user.dob}</Text>
            <Text style={styles.status}>
                Status: {user.isStudent ? "Student" : "Not a student"}
            </Text>
        </View>
    );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    fullname: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    dob: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        fontWeight: "500",
        color: "#007bff",
    },
});
