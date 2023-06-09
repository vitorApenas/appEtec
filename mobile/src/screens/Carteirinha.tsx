import { Image, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import { Loading } from '../components/Loading';
import { CarteirinhaField } from '../components/CarteirinhaField';

export function Carteirinha({navigation}){
    
    useEffect(()=>{
        getData();
    }, []);
    
    const [rm, setRm] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [rg, setRg] = useState<string>('');
    const [turma, setTurma] = useState<string>('');
    const [fotoPerfil, setFotoPerfil] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    async function getData(){
        setIsLoading(true);
        
        const keys = await AsyncStorage.getAllKeys();
        if(!keys.includes('@rm')) return navigation.navigate('login');
        
        const asData = await AsyncStorage.multiGet(['@rm', '@email', '@nome', '@rg', '@turma', '@profilePhoto']);
        setRm(asData[0][1]);
        setEmail(asData[1][1]);
        setNome(asData[2][1]);
        setRg(asData[3][1]);
        setTurma(asData[4][1]);
        setFotoPerfil(asData[5][1]);
        
        setIsLoading(false);
    }

    if(isLoading) return <Loading/>
    
    return(
        <View className="flex-1 bg-back items-center">
            <LinearGradient
                colors={['#6F87C3', '#A4AAB9']}
                className="w-full h-[28%] items-center"
            >
                <View className='w-full h-1/3'>
                    <TouchableOpacity
                        className='mt-1 h-full w-1/6 justify-end items-center'
                        onPress={()=>{navigation.navigate('home')}}
                    >
                        <Feather
                            name="arrow-left"
                            size={38}
                            color="#3A4365"
                        />
                    </TouchableOpacity>
                </View>
                <View className="rounded-full mt-[8%] border-4 border-[#99A0B1]">
                    <Image
                        source={require('../assets/tucanosPerfil/tuca01.png')}
                        className="rounded-full h-40 w-40"
                    />    
                </View>
                
            </LinearGradient>
            <CarteirinhaField
                label="Nome do aluno"
                text={nome}
                className="mt-7"
            />
            <CarteirinhaField
                label="RM Escolar"
                text={rm}
                className="mt-5"
            />
            <CarteirinhaField
                label="E-mail institucional"
                text={email}
                className="mt-5"
            />
            <CarteirinhaField
                label="Curso"
                text={turma}
                className="mt-5"
            />
            <CarteirinhaField
                label="RG"
                text={rg}
                className="mt-5"
            />
        </View>
    );
}