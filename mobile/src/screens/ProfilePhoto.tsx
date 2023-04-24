import { View, Text, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

export function ProfilePhoto({route, navigation}){
    
    const formAluno = route.params.aluno;
    const {rm, pass} = route.params;
    
    if(formAluno){
        
    }
    
    return(
        <View className="flex-1 bg-back items-center">
            <Text className="text-standart text-3xl font-nbold mt-16 w-3/4 text-center">
                Que tal uma foto de perfil pra deixar esse espaço com a sua cara?
            </Text>
            <Image
                source={require('../assets/Perfil_foto_cadastro.png')}
                className="h-2/5 mt-8"
                style={{resizeMode: 'contain'}}
            />
            <TouchableOpacity className="h-10 w-11 rounded-lg bg-gray-300 items-center justify-center border-2 border-gray-500 mt-8">
                <Text className="text-black text-3xl">
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}