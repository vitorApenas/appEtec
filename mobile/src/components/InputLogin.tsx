//import { Text, TextInput} from 'react-native';
import { TextInput as PTextInput} from 'react-native-paper';

type Props = React.ComponentProps<typeof PTextInput> & {
    label: string
}

export function InputLogin({label, ...rest}:Props){
    return(
        <PTextInput
            mode="outlined"
            label={`${label}`}
            outlineColor='#6B7280'
            activeOutlineColor='#6B7280'
            textColor='#5C6480'
            className="bg-[#F5F7FA] w-3/4 rounded-lg text-md"
            {...rest}
        />
    )
}