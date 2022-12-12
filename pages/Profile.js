import { View, Text  } from "react-native-web";
import { update } from "../utils/user"

const Profile = ({ route }) => {
    update(route.params.firebaseApp);

    return <View>
        <Text>Profile</Text>
    </View>
}

export default Profile;