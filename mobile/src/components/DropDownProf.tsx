import {View, Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface DropDownProps{
    id: string
    nome: string
    sigla: string
    presente: string
}

export function DropDownProf({id, nome, sigla, presente}:DropDownProps){
    return(
        <View className="w-full mb-3">
            <View className="flex-row justify-between">
                <View className="bg-white h-16 w-[75%] rounded-xl justify-between items-center p-2 flex-row">
                    <Text className="text-standart font-nsemibold text-base">
                        {nome}
                    </Text>
                    <FontAwesome
                        name="circle"
                        size={20}
                        color={presente}
                    />
                </View>
                <View className="bg-white h-16 w-16 rounded-xl justify-center items-center">
                    <Text className="text-standart font-nsemibold text-base">
                        {sigla}
                    </Text>
                </View>
            </View>
        </View>
    );
}