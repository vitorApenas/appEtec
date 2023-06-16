import { Image, Text, View, TouchableOpacity, Keyboard } from "react-native";
import { useState } from "react";

import { TabForm } from "../components/TabForm";
import { InputLogin } from "../components/InputLogin";
import { BtnForm } from "../components/BtnForm";
import { Loading } from "../components/Loading";

import {api} from '../lib/axios';

export function Login({navigation}){

    const [teclado, setTeclado] = useState<boolean>(false);
    const [formFunc, setFormFunc] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [rm, setRm] = useState<string>('')
    const [alunoSenha, setAlunoSenha] = useState<string>('');
    const [erroAluno, setErroAluno] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [funcSenha, setFuncSenha] = useState<string>('');

    Keyboard.addListener('keyboardDidShow', ()=>setTeclado(true));
    Keyboard.addListener('keyboardDidHide', ()=>setTeclado(false));

    async function loginAluno(){
        if(rm.trim().includes('.') || !Number.isInteger(Number(rm.trim())) || isNaN(Number(rm.trim())) || rm.trim().length !== 6) return setErroAluno("O RM é inválido!");
        if(alunoSenha.trim().length === 0) return setErroAluno("Coloque uma senha!");
        setErroAluno('');

        /*try{
            setIsLoading(true);
            const response = await api.post('/login/aluno', {
                rm: rm.trim(),
                senha: alunoSenha.trim()
            });
            if(response.data.msg) return setErroAluno(response.data.msg);
            try{
                await AsyncStorage.setItem('rm', rm);
                navigation.navigate('carteirinha')
            }
            catch(err){
                console.log(err);
            }
        }
        catch(err){

        }
        finally{
            setIsLoading(false);
        }*/
    }

    if(isLoading) return <Loading/>
    
    return(
        <View className="flex-1 bg-back items-center">
            {!teclado ?
                <>
                    <Image
                        source={require('../assets/Logo_tucano.png')}
                        className="h-28 mt-24"
                        style={{resizeMode: 'contain'}}
                    />
                    <Text className="text-standart font-nsemibold text-4xl mt-10">
                        ENTRAR
                    </Text>
                </>
                :
                    <Text className="text-standart font-nsemibold text-4xl mt-16">
                        ENTRAR
                    </Text>
            }

            <View className="flex-row w-3/4 justify-between mt-8">
                <TabForm
                    text="ALUNO"
                    isMarked={!formFunc}
                    onPress={()=>setFormFunc(false)}
                />
                <TabForm
                    text="FUNCIONÁRIO"
                    isMarked={formFunc}
                    onPress={()=>setFormFunc(true)}
                />
            </View>
            
            <View className="w-full items-center mt-3 h-2/6">
                {formFunc ? 
                    <>
                        <View className="w-full items-center h-1/2">
                            <InputLogin
                                label="E-mail"
                                value={email}
                                onChangeText={(value)=>setEmail(value)}
                                className="mt-2"
                            />
                            <InputLogin
                                label="Senha"
                                value={funcSenha}
                                onChangeText={(value)=>setFuncSenha(value)}
                                className="mt-4"
                            />
                        </View>
                        <BtnForm
                            text="ENTRAR"
                            className="mt-28"
                        />
                    </>
                : 
                    <>
                        <View className="w-full items-center h-1/2">
                            <InputLogin
                                label="RM"
                                keyboardType="number-pad"
                                value={rm}
                                onChangeText={(value)=>setRm(value)}
                                className="mt-2"
                                maxLength={6}
                            />
                            <InputLogin
                                label="Senha"
                                value={alunoSenha}
                                onChangeText={(value)=>setAlunoSenha(value)}
                                className="mt-4"
                            />
                        </View>
                        <BtnForm
                            text="ENTRAR"
                            className="mt-28"
                            onPress={()=>loginAluno()}
                            erro={erroAluno}
                        />
                    </>
                }
            </View>

            {!teclado &&
                <View className="items-center mt-24">
                    <Text className="text-gray-600 text-sm font-nsemibold">
                        Não tem conta?
                    </Text>

                    <TouchableOpacity
                        onPress={()=>navigation.navigate('signup')}
                    >
                        <Text className="text-standart text-base font-nbold underline">
                            CLIQUE AQUI!
                        </Text>
                    </TouchableOpacity>
                </View>
            }
    </View>
            
    )
}