import {View, StyleSheet, TextInput} from 'react-native';

const SearchBox = ({ value, onChange }) => {

    const handleChangeText = (text) => {
        if (onChange) {
          onChange(text)
        }
    }

    const styles = StyleSheet.create({
        container:{
            backgroundColor:'#7A428D',
            padding:10,
            borderRadius:5,
            borderColor:'#D7BDE2',
            borderWidth:1,
            marginBottom:30,
        },
        input:{
            color:"#FFF"
            
        }
    })


    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                placeholderTextColor="#D7BDE2"
                style={styles.input}
                placeholder='Busca las marcas disponibles'
                onChange={(e)=> handleChangeText(e.nativeEvent.text)}
            >
            </TextInput>
        </View>
    )
}

export default SearchBox;