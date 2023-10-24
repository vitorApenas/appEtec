import { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { Loading } from '../components/Loading';
import { Header } from '../components/Header';

import { api } from '../lib/axios';

export function EditarPresencas({navigation}){

    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused) getData();
    }, [isFocused]);

    async function getData(){
        setIsLoading(true);

        try{
            const conexao = await NetInfo.fetch();
            if(!conexao.isConnected) return navigation.navigate('login');

            const keys = await AsyncStorage.getAllKeys();
            if(!keys.includes('@email')) return navigation.navigate('login');
            if(keys.includes('@rm')) return navigation.navigate('home');

            
        }
        catch{
            setErro("Houve um erro no servidor, tente novamente mais tarde");
        }

        setIsLoading(false);
    }

    const [isLoading, setIsLoading] = useState<boolean>();
    const [erro, setErro] = useState<string>('');

    if(isLoading) return <Loading/>

    if(erro.length > 0) return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Editar Presenças"
                onPress={()=>navigation.navigate('login')}
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
                title="Editar Presenças"
                onPress={()=>navigation.navigate('horarioFunc')}
            />
        </View>        
    )
}