import { createNativeStackNavigator } from "@react-navigation/native-stack"

const {Navigator, Screen} = createNativeStackNavigator();

import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";
import { Email } from "../screens/Email";
import { ProfilePhoto } from "../screens/ProfilePhoto";

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="signup" component={Signup}/>
            <Screen name="login" component={Login}/>
            <Screen name="email" component={Email}/>
            <Screen name="profilePhoto" component={ProfilePhoto}/>
        </Navigator>
    )
}