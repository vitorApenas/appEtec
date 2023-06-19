import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "../components/Header";

export function Settings({navigation}){
    
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused) getData();
    }, [isFocused]);
    
    async function getData(){
        setIsLoading(true);

        const keys = await AsyncStorage.getAllKeys();
        if(!keys.includes('@email')) return navigation.navigate('login');

        setIsLoading(false);
    }

    async function logout(){
        setIsLoading(true);
        await AsyncStorage.clear();
        navigation.navigate('login');
        setIsLoading(false);
    }

    const [isLoading, setIsLoading] = useState<boolean>()

    return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Configurações"
                onPress={()=>navigation.navigate('home')}
            />
            <TouchableOpacity
                className="bg-[#CC3535] w-5/6 flex-row items-center h-16 rounded-lg absolute bottom-[4%]"
                onPress={()=>logout()}
            >
                <View className="ml-[3%]">
                    <Feather
                        name="log-out"
                        size={50}
                        color="#000"
                    />
                </View>
                <Text className="font-nbold text-white text-base ml-[3%]">Sair</Text>
            </TouchableOpacity>
        </View>
    )
}