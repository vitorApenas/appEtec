import { useState, useEffect } from 'react'
import { View, Text } from "react-native";
import { useIsFocused } from '@react-navigation/native';

import { Header } from "../components/Header";
import { Loading } from '../components/Loading';

export function CriarPost({navigation}){

    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused) getData();
    }, [isFocused]);

    async function getData(){

    }

    const [isLoading, setIsLoading] = useState<boolean>();
    const [erro, setErro] = useState<string>('');

    if(isLoading) return <Loading/>

    if(erro.length > 0) return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Criar post"
                onPress={()=>navigation.navigate('home')}
            />
            <View className="w-5/6 items-center mt-10">
                <Text className="text-lg font-nsemibold ml-1 text-red-700 text-center">
                    {erro}
                </Text>
            </View>
        </View>
    );

    return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Criar post"
                onPress={()=>{navigation.navigate('home')}}
            />
        </View>
    );
}