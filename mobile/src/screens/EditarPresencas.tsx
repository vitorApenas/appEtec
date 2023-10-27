import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
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

            const profsData = await api.get('/getPresencaProfs');
            setProfs(profsData.data);
        }
        catch{
            setErro("Houve um erro no servidor, tente novamente mais tarde");
        }

        setIsLoading(false);
    }

    const [isLoading, setIsLoading] = useState<boolean>();
    const [erro, setErro] = useState<string>('');

    const [profs, setProfs] = useState<any>([]);

    if(isLoading) return <Loading/>

    if(erro.length > 0) return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Professores"
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
                title="Professores"
                onPress={()=>navigation.navigate('horarioFunc')}
            />
            <View className="bg-white w-[90%] h-12 rounded-xl mt-5 p-1 flex-row items-center justify-start">
                <Image source={require('../assets/lupa.png')} className='h-9 w-9'/>
                <TextInput
                    className="w-5/6 h-8 ml-3 text-[#8087A0] font-nsemibold text-base"
                    placeholder="Pesquisar professor"
                />
            </View>
            <View className="w-[90%] h-12 rounded-xl mt-3 p-1 flex-row items-center justify-between">
                <Text className="text-standart font-nbold text-xl">Lista de Professores:</Text>
                <Text className="text-standart font-nbold text-xs">Nome/Sigla</Text>
            </View>
            <View className="w-[90%]">
                <View className="flex-row justify-between">
                    <View className="bg-white h-16 w-[75%] rounded-xl justify-center items-center p-1">
                        <Text className="text-standart font-nsemibold text-base">
                            Rosa Mitiko Shimizu
                        </Text>
                    </View>
                    <View className="bg-white h-16 w-16 rounded-xl justify-center items-center">
                        <Text className="text-standart font-nsemibold text-base">
                            RMS
                        </Text>
                    </View>
                </View>
            </View>
        </View>        
    )
}