### **Part 1: Create Mock API (2 Points)**

- **Endpoint**: `/user`
- **Fields**:
    - `fullname`: string
    - `dob`: ISO string (Date of Birth)
    - `username`: string
    - `password`: string
    - `image`: string
    - `isStudent`: boolean
- **Platform**: Use [MockAPI](https://mockapi.io/projects) to create this endpoint.

### **Part 2: Authentication (2 Points)**

- **Login Screen**:
    - **Fields**:
        - `username`: Text Input (required)
        - `password`: Text Input (required)

### **Part 3: Bottom Navigation Bar (3 Points)**

- **Tabs**:
    - **Home**:
        - Add filter by `isStudent`
        - Display a list of users in a Card UI format.
        - Fetch data from the Mock API.
    - **Manage User**:
        - Display a simple list of users with:
            - `username`
            - Two icons: `Update` and `Delete`
        - **Functionality**:
            - **Add User Button**: (+) icon at the top right to navigate to the Create User screen.
            - **Update Icon**: Navigate to the Update User screen.
            - **Delete Icon**: Remove the user from the list.

### **Part 4: User Management Screens (3 Points)**

- **User Detail Screen**:
    - Accessible from the Home screen when clicking on any user.
    - Display detailed information about the selected user.
- **Create User Screen**:
    - **Fields**: (All fields required)
        - `fullname`
        - `dob`
        - `username`
        - `password`
        - `image`
        - `isStudent`
    - **Functionality**:
        - Submit to create a new user in the Mock API.
- **Update User Screen**:
    - **Fields**: (All fields required)
        - `fullname`
        - `dob`
        - `image`
        - `isStudent`
    - **Functionality**:
        - Update the selected user’s `fullname` , `dob` , `image` and `isStudent`.
- **Manage User Screen**:
    - **Delete Functionality**:
        - Remove the user from the Mock API upon pressing the delete icon.
