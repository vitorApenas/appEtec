import { View, Text } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import { useState } from 'react';

export function Carteirinha({navigation}){
    
    const [rm, setRm] = useState<string>('');

    async function getData(){
        //return await AsyncStorage.getItem('rm');
    }
    
    return(
        <View>
            <Text>{rm}</Text>
        </View>
    );
}