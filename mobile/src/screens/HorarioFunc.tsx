import { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { Loading } from '../components/Loading';
import { Header } from '../components/Header';

import { api } from '../lib/axios';

export function HorarioFunc({navigation}){
    
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
            if(keys.includes('@rm')) return navigation.navigate('home');
            if(!keys.includes('@email')) return navigation.navigate('login');

            const turmas = await api.get('/turmas');
            if(turmas.data.msg){
                setErro(turmas.data.msg);
            }
            else{
                setTurmas([]);
                setTurmas(turmas.data)
                //turmas.data.map((item)=>setTurmas(turma => [...turma, item]));
            }
        }
        catch{
            setErro("Houve um erro no servidor, tente novamente mais tarde");
        }

        setIsLoading(false);
    }

    const [turmas, setTurmas] = useState<object[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>();
    const [erro, setErro] = useState<string>('');

    if(isLoading) return <Loading/>

    if(erro.length > 0) return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Horários"
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
                title="Horários"
                onPress={()=>navigation.navigate('home')}
            />
            <View className="w-full h-full absolute top-24 items-center">
                <FlatList
                    className="w-5/6"
                    data={turmas}
                    renderItem={(turma:any)=>(
                        <TouchableOpacity
                            className="w-full h-20 bg-white mt-5 items-center justify-center rounded-xl border border-gray-300"
                            onPress={()=>navigation.navigate('editarHorario', {obj: turma.item})}
                        >
                            <Text className="font-nsemibold text-standart text-xl text-center">
                                {`${turma.item.turma} - ${turma.item.curso.toUpperCase()}`}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}