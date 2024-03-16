import { useState } from 'react';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { View } from "react-native"
import loginStyle from "../../assets/styles/login"
const LogoFarmaciasLopez =  require('../../public/farmacias-lopez.jpg')

const Register = ({navigation})=>{

    const [gender, setGender] = useState({
        value: '',
        list: [
          { _id: '1', value: 'MALE' },
          { _id: '2', value: 'FEMALE' },
          { _id: '3', value: 'OTHERS' },
        ],
        selectedList: [],
        error: '',
      });

    return(
        <>
        <Appbar.Header style={ loginStyle.appbar }>
            <Appbar.BackAction color='#fff'  onPress={() => { navigation.navigate('Login') }} />
            <Appbar.Content color='#fff' title="Registrar" />
        </Appbar.Header>
        <View style={ loginStyle.loginWrap }>
            <Text variant="displaySmall">Crear una cuenta</Text>
            <Text variant="titleMedium">Por favor ingresa tu datos</Text>
            <View>
                <Text variant="titleSmall">Nombres completos</Text>
                <TextInput
                    label="Nombres completos"
                    onChangeText={text => setText(text)}
                />
                <Text variant="titleSmall">Correo eléctronico</Text>
                <TextInput
                    label="Correo eléctronico"
                    onChangeText={text => setText(text)}
                />
                <Text variant="titleSmall">Contraseña</Text>
                <TextInput
                    label="Contraseña"
                    onChangeText={text => setText(text)}
                />
                <Text variant="titleSmall">Repite tu Contraseña</Text>
                <TextInput
                    label="Repite tu Contraseña"
                    onChangeText={text => setText(text)}
                />
                <Text variant="titleSmall">Tipo de usuario</Text>
                <PaperSelect
                    label="Tipo de Usuario"
                    value={gender.value}
                    onSelection={(value) => {
                    setGender({
                        ...gender,
                        value: value.text,
                        selectedList: value.selectedList,
                        error: '',
                    });
                    }}
                    arrayList={[...gender.list]}
                    selectedArrayList={gender.selectedList}
                    errorText={gender.error}
                    multiEnable={false}
                    dialogTitleStyle={{ color: 'red' }}
                    checkboxColor="yellow"
                    checkboxLabelStyle={{ color: 'red', fontWeight: '700' }}
                    textInputBackgroundColor="yellow"
                    textInputColor="red"
                    outlineColor="black"
                    theme={{
                    colors: {
                        placeholder: 'black'
                    }
                    }}
                />
            </View>
        </View>
        </>
    )
}

export default Register