import { View, Text, FlatList } from 'react-native';
import { useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';

export function EditarHorarioDia({route, navigation}){

    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused) getData();
    },[isFocused]);

    async function getData(){
        setIsLoading(true);

        try{
            const conexao = await NetInfo.fetch();
            if(!conexao.isConnected) return navigation.navigate('login');

            const keys = await AsyncStorage.getAllKeys();
            if(keys.includes('@rm')) return navigation.navigate('home');
            if(!keys.includes('@email')) return navigation.navigate('login');

            if(!route.params.dia || !route.params.horario) return setErro("Houve um erro no servidor, tente novamente mais tarde");
        }
        catch{
            setErro("Houve um erro no servidor, tente novamente mais tarde");
        }

        setIsLoading(false);
    }
    
    const [isLoading, setIsLoading] = useState<boolean>();
    const [erro, setErro] = useState<string>('');

    const teste = ["a", "b", "c", "D"]

    if(isLoading) return <Loading/>

    if(erro.length > 0) return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Horários"
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
                title="Editar horário"
                onPress={()=>navigation.goBack()}
            />
            <View className="w-5/6 mt-[5%]">
                <Text className="font-nbold text-standart text-xl">
                    {route.params.dia}
                </Text>
            </View>
            <View className="w-full flex-row justify-center mt-5">
                <View className="w-1/3 items-center">
                    <Text className="font-nbold text-standart text-base">
                        Horário
                    </Text>
                </View>
                <View className="w-1/3 items-center">
                    <Text className="font-nbold text-standart text-base">
                        Matéria
                    </Text>
                </View>
                <View className="w-1/3 items-center">
                    <Text className="font-nbold text-standart text-base">
                        Professor
                    </Text>
                </View>
            </View>
            <FlatList
                data={route.params.horario}
                renderItem={(item)=>(
                    <View className="w-full flex-row justify-evenly">
                        <View className="border-standart border-r w-1/3 items-center justify-center">
                            <Text className="font-nbold text-standart text-base">
                                {item.item.horario}
                            </Text>
                        </View>
                        <View className="w-1/3 items-center justify-center">
                            <Text className="font-nbold text-standart text-base">
                                {item.item.materia}
                            </Text>
                        </View>
                        <View className="border-standart border-l w-1/3 items-center justify-center">
                            <Text className="font-nbold text-standart text-base">
                                {item.item.prof}
                            </Text>
                        </View>
                    </View>
                )}
            />
            
        </View>
    )
}