import { createNativeStackNavigator } from "@react-navigation/native-stack"

const {Navigator, Screen} = createNativeStackNavigator();

import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";
import { Carteirinha } from "../screens/Carteirinha";
import { ProfilePhoto } from "../screens/ProfilePhoto";
//import { Email } from "../screens/Email";

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="login" component={Login}/>
            <Screen name="signup" component={Signup}/>
            <Screen name="profilePhoto" component={ProfilePhoto}/>
            <Screen name="carteirinha" component={Carteirinha}/>
        </Navigator>
    )
}