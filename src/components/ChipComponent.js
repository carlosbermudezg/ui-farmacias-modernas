import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-paper'

const ChipComponent = ({selected, title, onPress, textColor, textSelectedColor, borderColor, backgroundColor, selectedColor, borderColorSelected}) => {

    const styles = StyleSheet.create({
        title:{
            color: textColor
        },
        titleSelected:{
            color: textSelectedColor
        },
        item: {
            padding:8,
            borderWidth:1,
            marginVertical: 8,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderRadius: 5,
            flexDirection:'row',
            gap:8
        },
        item_selected: {
            borderWidth:1,
            backgroundColor: selectedColor,
            borderColor: borderColorSelected,
            color: textSelectedColor
        }
    })

    return(
        <TouchableOpacity onPress={onPress} style={[styles.item, selected && styles.item_selected]}>
            { !selected ? 
            <Icon
                source="city-variant-outline"
                color={textColor}
                size={20}
                style={styles.icon}
            /> :
            <Icon
                source="check-circle-outline"
                color={textColor}
                size={20}
                style={styles.icon}
            />
            }
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ChipComponent;