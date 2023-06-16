import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Dimensions} from 'react-native'

import { BtnForm } from '../components/BtnForm';
import { api } from '../lib/axios';

export function ProfilePhoto({route, navigation}){

    const screenWidth = Dimensions.get('screen').width;

    const flatListData = [
        {key: '1', src: 'tuca01.png'},
        {key: '2', src: 'tuca02.png'},
        {key: '3', src: 'tuca03.png'},
        {key: '4', src: 'tuca04.png'},
        {key: '5', src: 'tuca05.png'},
        {key: '6', src: 'tuca06.png'},
        {key: '7', src: 'tuca07.png'},
        {key: '8', src: 'tuca08.png'}
    ]

    return(
        <View className="flex-1 bg-back items-center">
            <Text className="text-standart text-3xl font-nbold mt-12 w-3/4 text-center">
                Escolha sua foto de perfil
            </Text>

            <Image 
                source={require('../assets/tucanosPerfil/tuca01.png')} 
                className="w-1/3 rounded-full mt-0" 
                style={{resizeMode: 'contain', height: screenWidth/3}}
            />
            
            {/*Testar com a flatlist também*/}
            <View className="w-full border border-black mt-2" style={{height: screenWidth}}>
                <ScrollView>
                    <TouchableOpacity
                        onPress={()=>alert("as")}
                    >
                        <Image
                            source={require('../assets/tucanosPerfil/tuca01.png')}
                            className="w-1/3 rounded-full"
                            style={{resizeMode: 'contain', height: screenWidth/3}}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={()=>alert("as")}
                    >
                        <Image
                            source={require('../assets/tucanosPerfil/tuca02.png')}
                            className="w-1/3 rounded-full"
                            style={{resizeMode: 'contain', height: screenWidth/3}}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <BtnForm
            className="mt-4"
            text="CONFIRMAR"
            erro="Houve um erro no servidor, tente novamente mais tarde"
            />
        </View>
    )
}