import {View, StyleSheet, TextInput, Text} from 'react-native';
import { useState, useEffect } from 'react'

const TextInputComponent = ({ val, label, labelColor, inputColor, color, borderColor, secureTextEntry, onChange }) => {

    const styles = StyleSheet.create({
        container:{
            paddingTop:9,
            paddingBottom:10,
            justifyContent:'center',
            backgroundColor: color
        },
        input: {
            height: 45,
            borderColor: borderColor,
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            width:'100%',
            backgroundColor: color
        },
        inputText: {
            color: inputColor
        },
        inputSelected:{
            borderWidth:2
        },
        text: {
            backgroundColor: color,
            color:labelColor,
            fontSize: 14,
            paddingLeft:5,
            paddingRight:5,
            zIndex:20
        },
        label:{
            position:'absolute',
            marginLeft:10,
            color:'#999'
        },
        labelFloating:{
            position:'absolute',
            top:0,
            // backgroundColor:'green',
            paddingLeft:5,
            paddingRight:5,
            marginLeft:10,
            color:'#999',
            justifyContent:'center',
            alignItems:'center'
        },
        hide : {
            display: 'none'
        }
    })
    
    const [islabelFloating, setIsLabelFloating] = useState(false)
    const [value, setValue] = useState('')

    useEffect(()=>{
        if(val){
            setIsLabelFloating(true)
        }
    },[])

    
    const handleChangeText = (text) => {
        setValue(text)
        if (onChange) {
          onChange(text)
        }
    }

    return (
        <View style={styles.container}>
        <TextInput
            value={val}
            secureTextEntry={secureTextEntry}
            style={[styles.input, islabelFloating && styles.inputSelected, styles.inputText]}
            onFocus={ ()=> {
                setIsLabelFloating(true)
            }}
            onEndEditing={ ()=> {
                setIsLabelFloating(false)
            }}
            onChange={(e)=> handleChangeText(e.nativeEvent.text)}
        />
        <View style={[islabelFloating || value.length > 0 ? styles.labelFloating : styles.label]}>
            <Text style={styles.text}>{ label }</Text>
            {islabelFloating && (
                <View style={styles.hiddenBorder} />
            )}
        </View>
        </View>
    )
}

export default TextInputComponent;