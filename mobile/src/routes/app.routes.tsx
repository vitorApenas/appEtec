import { createNativeStackNavigator } from "@react-navigation/native-stack"

const {Navigator, Screen} = createNativeStackNavigator();

import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";
import { Carteirinha } from "../screens/Carteirinha";
import { ProfilePhoto } from "../screens/ProfilePhoto";
import { Refeitorio } from "../screens/Refeitorio";
import { EditarRefeicao } from "../screens/EditarRefeicao";
import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { Horario } from "../screens/Horario";
//import { Email } from "../screens/Email";

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="login" component={Login}/>
            <Screen name="signup" component={Signup}/>
            <Screen name="profilePhoto" component={ProfilePhoto}/>
            <Screen name="carteirinha" component={Carteirinha}/>
            <Screen name="refeitorio" component={Refeitorio}/>
            <Screen name="editarRefeicao" component={EditarRefeicao}/>
            <Screen name="home" component={Home}/>
            <Screen name="settings" component={Settings}/>
            <Screen name="horario" component={Horario}/>
        </Navigator>
    )
}