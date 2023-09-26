import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

import { Loading } from "../components/Loading";
import { Header } from "../components/Header"

import {api} from '../lib/axios';

export function AeP({navigation}){

    const isFocused = useIsFocused();

    useEffect(()=>{
        getData();
    }, [isFocused]);

    async function getData(){
        setIsLoading(true)

        const conexao = await NetInfo.fetch();
        if(!conexao.isConnected) return navigation.navigate('login');

        const keys = await AsyncStorage.getAllKeys();
        if(!keys.includes('@email')) return navigation.navigate('login');

        setIsLoading(false)
    }

    const [tagsAep, setTagsAep] = useState<any>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>();

    if(isLoading) return <Loading/>

    return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="A&P"
                onPress={()=>navigation.navigate('home')}
            />
            <View>
                <Text>Itens perdidos:</Text>
                {
                    
                }
            </View>
        </View>
    )
}