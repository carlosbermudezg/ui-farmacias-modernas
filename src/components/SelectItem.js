import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Icon } from "react-native-paper"

const SelectItem = ({selected, title, onPress, backgroundColor, borderColor, textColor, textSelectedColor, selectedColor, borderColorSelected}) => {

    const styles = StyleSheet.create({
        title:{
            color: textColor
        },
        titleSelected:{
            color: textSelectedColor
        },
        item: {
          padding: 20,
          marginVertical: 8,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth:1,
          borderRadius: 5,
          flexDirection:'row',
          justifyContent:'space-between'
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
            <Text style={[!selected ? styles.title : styles.titleSelected]}>{title}</Text>
            {
                selected && 
                <Icon
                    source="check-circle-outline"
                    color={textColor}
                    size={20}
                    style={styles.icon}
                />
            }
        </TouchableOpacity>
    )
}

export default SelectItem
