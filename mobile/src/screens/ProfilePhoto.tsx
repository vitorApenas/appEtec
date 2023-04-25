import { View, Text, Image, TouchableOpacity, ImageComponent } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { BtnForm } from '../components/BtnForm';
import { api } from '../lib/axios';

export function ProfilePhoto({route, navigation}){
    
    const formAluno = route.params.aluno;
    const {rm, pass} = route.params;

    const [image, setImage] = useState<string>('');
    const [erroImg, setErroImg] = useState<string>('');

    async function pegarImg(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        });
        //console.log(result.assets[0].uri);
        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    }

    async function upload(){
        const fileName = image.substring(
            image.lastIndexOf('/') + 1,
            image.length
        );

        const extensao = fileName.split('.')[1];

        console.log(extensao)
        
        const formData = new FormData();
        formData.append('fotoPerfil', JSON.parse(
            JSON.stringify({
                uri: image,
                name: `${rm.toString()}.${extensao}`,
                type: `image/${extensao}`
            })
        ));

        const response = await api.post('/cadastro/aluno', {
            rm: rm,
            pass: pass,
            image: formData
        });

        console.log(response.data);
        
    }
    
    return(
        <View className="flex-1 bg-back items-center">
            <Text className="text-standart text-3xl font-nbold mt-16 w-3/4 text-center">
                Que tal uma foto de perfil pra deixar esse espaço com a sua cara?
            </Text>
            {image ?
                <Image
                    source={{uri: image}}
                    className="h-80 w-80 mt-8 rounded-full"
                />
            :
                <Image
                    source={require('../assets/Perfil_foto_cadastro.png')}
                    className="h-80 w-80 mt-8 rounded-full"
                />
            }
            <TouchableOpacity
                onPress={()=>pegarImg()}
                className="h-10 w-11 rounded-lg bg-gray-300 items-center justify-center border-2 border-gray-500 mt-8"
            >
                <Text className="text-black text-3xl">
                    +
                </Text>
            </TouchableOpacity>
            <BtnForm
                className="mt-12"
                text="CADASTRAR"
                erro={erroImg}
                onPress = {()=>upload()}
            />
        </View>
    )
}