import {View, Text, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

import { TabForm } from '../components/TabForm';
import { InputLogin } from '../components/InputLogin';
import { BtnForm } from '../components/BtnForm'
import { Loading } from '../components/Loading';
import { Feather } from '@expo/vector-icons';

import { api } from '../lib/axios';

export function Signup({navigation}){   
    
    async function cadastroAluno(){
        const regexPass = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        
        if(rm.trim().includes('.') || !Number.isInteger(Number(rm.trim())) || isNaN(Number(rm.trim())) || rm.length !== 6) return setErroAluno("O RM é inválido!");
        if(passAluno.trim().includes(' ')) return setErroAluno("A senha não pode ter espaços!")
        if(passAluno.trim().length < 8) return setErroAluno("A senha precisa de no mínimo 8 caracteres.");
        if(!regexPass.test(passAluno)) return setErroAluno("A senha precisa ter letras e números.")
        if(confirmPassAluno.trim() !== passAluno.trim()) return setErroAluno("As senhas não são iguais!");
        setErroAluno('');
        try{
            setIsLoading(true);
            
            const check = await api.post('/check/aluno', {
                rm: Number(rm)
            });
            if(check.data.msg) return setErroAluno(check.data.msg);

            navigation.navigate('profilePhoto');
            
            /*const cadastro = await api.post('/cadastro/aluno', {
                rm: Number(rm),
                senha: passAluno
            });*/
            
            /*const resCadastro = await api.post('/cadastro/aluno', {
                rm: rm,
                senha: passAluno
            });
            if(resCadastro.data.criado) return navigation.navigate('login');*/
        }
        catch(err){
            setErroAluno("Houve um problema, tente novamente mais tarde");
            console.log(`Erro: ${err}`);
        }
        finally{
            setIsLoading(false);
        }
    }

    async function cadastroFunc(){

    }

    const regexEmail = /^[^\s@]+@etec.sp.gov.br$/;
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formFunc, setFormFunc] = useState<boolean>(false);
    const [hidePass, setHidePass] = useState<boolean>(true);

    const [rm, setRm] = useState<string>('210066');
    const [passAluno, setPassAluno] = useState<string>('vitorvitor123');
    const [confirmPassAluno, setConfirmPassAluno] = useState<string>('vitorvitor123');
    const [erroAluno, setErroAluno] = useState<string>('');

    const [email, setEmail] = useState<string>('vitor.estevanin@etec.sp.gov.br');
    const [passFunc, setPassFunc] = useState<string>('');
    const [confirmPassFunc, setConfirmPassFunc] = useState<string>('');
    const [erroFunc, setErroFunc] = useState<string>('');

    if(isLoading) return <Loading/>
    
    return(
        <View className="flex-1 bg-back items-center">
            <Text className="text-standart font-nsemibold text-4xl mt-16">
                CADASTRE-SE
            </Text>
            <View className="flex-row w-3/4 justify-between mt-4">
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
            {formFunc ? 
                <>
                    <InputLogin
                        label="E-mail"
                        legenda="Digite seu email institucional (@etec.sp.gov.br)."
                        value={email}
                        onChangeText={(value)=>setEmail(value)}
                        className="mt-8"
                    />
                    {regexEmail.test(email) &&
                        <>
                            <InputLogin
                                label="Senha"
                                legenda="Crie uma senha com pelo menos 8 caracteres sem espaços, incluindo letras e números."
                                value={passFunc}
                                onChangeText={(value)=>setPassFunc(value)}
                                secureTextEntry={hidePass}
                                className="mt-4"
                            />
                            <InputLogin
                                label="Confirme a senha"
                                value={confirmPassFunc}
                                onChangeText={(value)=>setConfirmPassFunc(value)}
                                secureTextEntry={hidePass}
                                className="mt-4"
                            />

                            <View className="w-3/4 justify-start items-center flex-row mt-4">
                                <TouchableOpacity
                                    className="h-7 w-7 border-2 border-[#82878A] rounded-md items-center justify-center"
                                    onPress={()=>setHidePass(!hidePass)}
                                    activeOpacity={1}
                                >
                                    {!hidePass &&
                                        <Feather
                                            name="check"
                                            size={24}
                                            color="#82878A"
                                        />
                                    }
                                </TouchableOpacity>
                                <Text className="font-nsemibold ml-1 text-[#7F779A]">
                                    Mostrar senha
                                </Text>
                            </View>

                            <BtnForm
                                text="CADASTRAR"
                                erro={erroFunc}
                                className="mt-44"
                                onPress={()=>{}}
                            />
                        </>
                    }
                </>
            :
                <>
                    <InputLogin
                        label="RM"
                        legenda="Digite seu RM escolar."
                        value={rm}
                        onChangeText={(value)=>setRm(value)}
                        keyboardType="number-pad"
                        className="mt-8"
                        maxLength={6}
                    />
                    {rm.length === 6 &&
                        <>
                            <InputLogin
                                label="Senha"
                                legenda="Crie uma senha com pelo menos 8 caracteres sem espaços, incluindo letras e números."
                                value={passAluno}
                                onChangeText={(value)=>setPassAluno(value)}
                                secureTextEntry={hidePass}
                                className="mt-4"
                            />
                            <InputLogin
                                label="Confirme a senha"
                                value={confirmPassAluno}
                                onChangeText={(value)=>setConfirmPassAluno(value)}
                                secureTextEntry={hidePass}
                                className="mt-4"
                            />

                            <View className="w-3/4 justify-start items-center flex-row mt-4">
                                <TouchableOpacity
                                    className="h-7 w-7 border-2 border-[#82878A] rounded-md items-center justify-center"
                                    onPress={()=>setHidePass(!hidePass)}
                                    activeOpacity={1}
                                >
                                    {!hidePass &&
                                        <Feather
                                            name="check"
                                            size={24}
                                            color="#82878A"
                                        />
                                    }
                                </TouchableOpacity>
                                <Text className="font-nsemibold ml-1 text-[#7F779A]">
                                    Mostrar senha
                                </Text>
                            </View>

                            <BtnForm
                                text="CADASTRAR"
                                erro={erroAluno}
                                className="mt-44"
                                onPress={()=>cadastroAluno()}
                            />
                        </>
                    }
                </>
            }
        </View>
    )
}