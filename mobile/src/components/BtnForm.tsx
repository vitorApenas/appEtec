import { TouchableOpacityProps, TouchableOpacity, Text } from "react-native";

interface Props extends TouchableOpacityProps{
    text: string
}

export function BtnForm({text, ...rest}:Props){
    return(
        <TouchableOpacity
            className="bg-[#F5F7FA] h-14 border border-gray-400 w-3/4 items-center justify-center rounded-xl"
            {...rest}
        >
            <Text className="text-standart font-nsemibold text-xl">
                {text}
            </Text>
        </TouchableOpacity>
    )
}