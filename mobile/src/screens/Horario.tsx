import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Header } from '../components/Header';

export function Horario({navigation}){

    const screenWidth = Dimensions.get('screen').width;
    
    return(
        <View className="flex-1 bg-back items-center">
            <Header
                title="Horários"
                onPress={()=>navigation.navigate('home')}
            />
            <ScrollView className="w-full h-full bg-back">
                <View className="h-full items-center">
                    <View className="w-[85%] items-start">
                        <Text className="text-standart text-xl font-nbold">Sua aula nesse momento:</Text>
                    </View>
                    <View className="w-[85%] flex-row justify-between">
                        <View
                            className="bg-white rounded-xl border border-gray-300 items-center justify-start"
                            style={{
                                height: screenWidth/4,
                                width: screenWidth/4
                            }}
                        >
                            <Text className="text-black font-nsemibold text-base mt-[5%]">História</Text>
                            <Image
                                source={require('../assets/materias/his_icon.png')}
                                className="h-12 w-12 mt-[5%]"
                            />
                        </View>

                        <View
                            className="bg-white rounded-xl border border-gray-300"
                            style={{
                                height: screenWidth/4,
                                width: screenWidth/2
                            }}
                        >
                            <View className="flex-row items-center w-[95%] bg-red-500">
                                <Text className="text-black font-nsemibold text-base">Status do professor</Text>
                                
                                    <FontAwesome
                                        name="circle"
                                        size={20}
                                        color="#00B489"
                                    />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}