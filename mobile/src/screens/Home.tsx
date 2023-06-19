import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Loading } from "../components/Loading";

export function Home({navigation}){

    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused) getData();
    }, [isFocused]);

    async function getData(){
        setIsLoading(true);

        const keys = await AsyncStorage.getAllKeys();
        if(keys.includes('@rm')) setIsFunc(false);
        if(keys.includes('@email') && !keys.includes('@rm')) setIsFunc(true);
        if(!keys.includes('@email')) return navigation.navigate('login');

        setIsLoading(false);
    }

    const [isLoading, setIsLoading] = useState<boolean>();
    const [isFunc, setIsFunc] = useState<boolean>();

    if(isLoading) return <Loading/>

    return(
        <View className="flex-1 bg-back items-center">
            <View className="w-full bg-[#99A0B1] h-24 flex-row items-end pb-1 pl-2">
                {!isFunc &&
                    <TouchableOpacity
                        className="border-[#3A4365] border-2 rounded-full"
                        onPress={()=>navigation.navigate('carteirinha')}
                    >
                        <Image
                            source={require('../assets/tucanosPerfil/tuca01.png')}
                            className="rounded-full h-12 w-12"
                        />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    className="absolute right-2 bottom-1"
                    onPress={()=>navigation.navigate('settings')}
                >
                    <Feather
                        name="settings"
                        size={42}
                        color="#3A4365"
                    />
                </TouchableOpacity>
            </View>
            <View className="w-full bg-[#99A0B1] h-16 absolute bottom-0">
                <TouchableOpacity
                    onPress={()=>navigation.navigate('refeitorio')}
                >
                    <MaterialIcons
                        name="restaurant-menu"
                        size={42}
                        color="#3A4365"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}