import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native'
import { useState } from 'react';

import { BtnForm } from '../components/BtnForm';
import { api } from '../lib/axios';

export function ProfilePhoto({route, navigation}){

    const screenWidth = Dimensions.get('screen').width;
    const {rm, senha} = route.params;

    const [profilePic, setProfilePic] = useState(require(`../assets/tucanosPerfil/tuca01.png`));
    const prof = new Function(profilePic);

    return(
        <View className="flex-1 bg-back items-center">
            <Text className="text-standart text-3xl font-nbold mt-12 w-3/4 text-center">
                Escolha sua foto de perfil
            </Text>

            <Image 
                source={profilePic}
                className="w-1/3 rounded-full" 
                style={{resizeMode: 'contain', height: screenWidth/3}}
            />
            
            {/*Testar com a flatlist também*/}
            <View className="w-full mt-2" style={{height: screenWidth}}>
                <ScrollView>
                    <View className="w-full flex-row justify-around mb-8" style={{height: screenWidth/3}}>
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca01.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca01.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca02.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca02.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="w-full flex-row justify-around mb-8" style={{height: screenWidth/3}}>
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca03.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca03.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca04.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca04.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="w-full flex-row justify-around mb-8" style={{height: screenWidth/3}}>
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca05.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca05.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca06.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca06.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="w-full flex-row justify-around" style={{height: screenWidth/3}}>
                        <TouchableOpacity
                            onPress={()=>{setProfilePic(require('../assets/tucanosPerfil/tuca07.png'))}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca07.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>{setProfilePic("require('../assets/tucanosPerfil/tuca08.png')")}}
                            style={{height: screenWidth/3, width: screenWidth/3}}
                        >
                            <Image
                                source={require('../assets/tucanosPerfil/tuca08.png')}
                                className="rounded-full w-full h-full"
                                style={{resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <BtnForm
                className="mt-4"
                text="CONFIRMAR"
                onPress={()=>{eval('alert("oi")')}}
                /*
                
                api.post('/cadastro/aluno', {
                    rm: rm,
                    senha: senha,
                    img: profilePic
                })
                
                */
            />
        </View>
    )
}