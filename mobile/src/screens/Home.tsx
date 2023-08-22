import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import NetInfo from '@react-native-community/netinfo';

import { Loading } from "../components/Loading";

import { api } from "../lib/axios";

export function Home({navigation}){

    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused) getData();
    }, [isFocused]);

    async function getData(){
        setIsLoading(true);    

        const conexao = await NetInfo.fetch();
        if(!conexao.isConnected) return navigation.navigate('login');

        const keys = await AsyncStorage.getAllKeys();
        if(keys.includes('@rm')){
            try{
                const check = await api.post('/check/aluno', {rm: await AsyncStorage.getItem('@rm')});
                if(check.data.msg !== "O aluno com esse RM já está cadastrado") return navigation.navigate('login');
                const asNome = await AsyncStorage.getItem('@nome');
                setNome(asNome.split(' ')[0]);
                setIsFunc(false);
            }
            catch{
                return navigation.navigate('login');
            }
        };
        if(keys.includes('@email') && !keys.includes('@rm')){
            try{
                const check = await api.post('/check/funcionario', {email: await AsyncStorage.getItem('@email')});
                if(check.data.msg !== "Esse funcionário já está cadastrado") return navigation.navigate('login');
                const asNome = await AsyncStorage.getItem('@nome');
                setNome(asNome.split(' ')[0]);
                setIsFunc(true);
                
            }
            catch{
                return navigation.navigate('login');
            }
        }
        if(!keys.includes('@email')) return navigation.navigate('login');
        
        const foto = await AsyncStorage.getItem('@profilePhoto');
        setProfilePic(serverURL + 'perfilTucanos/' + foto);

        const resPosts = await api.get('/posts');
        setPosts(resPosts.data);

        //if(posts == undefined) getData();

        setIsLoading(false);
    }

    const screenHeight = Dimensions.get('screen').height;
    const [nome, setNome] = useState<string>('');
    const [posts, setPosts] = useState<any>([{}]);
    
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isFunc, setIsFunc] = useState<boolean>();

    const serverURL = (api.defaults.baseURL).replace('api', 'images/');
    const [profilePic, setProfilePic] = useState<string>();

    if(isLoading) return <Loading/>

    return(
        <View className="flex-1 bg-back items-center">
            <View className="w-full bg-[#99A0B1] h-24 flex-row items-end pb-1 pl-2">
                {isFunc ? 
                    (
                        <View className="border-[#3A4365] border-2 rounded-full">
                            <Image
                                source={{uri: profilePic}}
                                className="rounded-full h-12 w-12"
                            />
                        </View>
                    )
                :
                    (
                        <TouchableOpacity
                            className="border-[#3A4365] border-2 rounded-full"
                            onPress={()=>navigation.navigate('carteirinha')}
                        >
                            <Image
                                source={{uri: profilePic}}
                                className="rounded-full h-12 w-12"
                            />
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    className="absolute right-3 bottom-1"
                    onPress={()=>navigation.navigate('settings')}
                >
                    <Feather
                        name="settings"
                        size={42}
                        color="#3A4365"
                    />
                </TouchableOpacity>

            </View>
            <View className="w-full h-[90%] items-center">
                <ScrollView
                contentContainerStyle={{alignItems: 'center'}}
                className="w-full h-full">
                    <View className="mt-5 w-[85%]" key={0}>
                        <Text className="text-standart text-lg font-nbold">
                            Bem vindo(a) de volta, {nome}!
                        </Text>
                    </View>
                    
                    {
                        posts ? posts.map((item)=>(
                            <View
                                className="mt-5 mb-5 w-[85%] bg-white rounded-xl border border-gray-300 items-center"
                                key={item.id}
                            >
                                <View className="w-[95%] mt-1">
                                    <View className="flex-row justify-start items-center">
                                        <View className="border-[#3A4365] border-2 rounded-full">
                                            <Image
                                                source={{uri: serverURL + 'perfilTucanos/' + item.funcFoto}}
                                                className="rounded-full h-10 w-10"
                                            />
                                        </View>
                                        <Text
                                            className="text-standart font-nbold text-sm ml-1"
                                        >
                                            {item.funcNome}
                                        </Text>
                                    </View>
                                    {item.foto && 
                                        <Image
                                            source={{uri: `${serverURL}postImages/${item.id}.${item.extensao}`}}
                                            className="w-full rounded-xl mt-1"
                                            style={{
                                                height: screenHeight*0.22,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    }
                                    <Text className="mt-2 text-justify text-black font-nregular">
                                        {item.txt}
                                    </Text>
                                </View>
                            </View>
                        ))
                        :
                        <View className="mt-5 mb-5 w-[85%] bg-white h-44 rounded-xl border border-gray-300" key={1}/>
                    }
                    <View className="h-36"/>
                </ScrollView>
            </View>

            <View className="w-full bg-[#99A0B1] h-16 absolute bottom-0 justify-center items-center">
                <View className="w-5/6 flex-row justify-between items-center">
                    <TouchableOpacity
                        onPress={()=>{isFunc ? navigation.navigate('horarioFunc') : navigation.navigate('horario')}}
                    >
                        <Image
                            source={require("../assets/home/Horario_icon.png")}
                            className="h-8 w-8"
                        />
                    </TouchableOpacity>
                    <View
                        className="w-0.5 h-8 bg-white rounded-full"
                    />
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('refeitorio')}
                    >
                        <Image
                            source={require("../assets/home/Cardapio_icon.png")}
                            className="h-8 w-8"
                        />
                    </TouchableOpacity>
                    <View
                        className="w-0.5 h-8 bg-white rounded-full"
                    />
                    <TouchableOpacity
                        onPress={()=>{}}
                        className="items-center justify-center"
                    >
                        <Image
                            source={require("../assets/home/Home.png")}
                            className="h-8 w-8"
                        />
                        <Text className="font-nbold text-white text-sm">Home</Text>
                    </TouchableOpacity>
                    <View
                        className="w-0.5 h-8 bg-white rounded-full"
                    />
                    <TouchableOpacity
                        onPress={()=>{}}
                    >
                        <Image
                            source={require("../assets/home/Biblioteca_icon.png")}
                            className="h-8 w-8"
                        />
                    </TouchableOpacity>
                    <View
                        className="w-0.5 h-8 bg-white rounded-full"
                    />
                    <TouchableOpacity
                        onPress={()=>{}}
                    >
                        <Image
                            source={require("../assets/home/A_P_icon.png")}
                            className="h-8 w-8"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                    className="bg-[#3A4365] rounded-full w-16 h-16 items-center justify-center"
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '8%',
                        zIndex: 9
                    }}
                    onPress={()=>navigation.navigate('criarPost')}
                >
                    <Feather
                        name="plus"
                        size={38}
                        color="#FFF"
                    />
                </TouchableOpacity>
        </View>
    )
}