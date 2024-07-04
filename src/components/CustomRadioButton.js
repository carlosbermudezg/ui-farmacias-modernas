import { View, StyleSheet, Text } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

const CustomRadioButton = ({ label, value, selectedValue, onPress }) => {

  return(
    <TouchableRipple 
      onPress={() => onPress(value)} 
      style={[styles.radioButtonContainer, selectedValue === value ? styles.selected : styles.unselected]}  
      rippleColor="rgba(0, 0, 0, .32)">
      <>
      <View style={styles.radioButton}>
        {selectedValue === value ? (
          <Icon name="check-circle" size={20} color="#000" />
        ) : (
          <Icon name="circle-thin" size={20} color="#000" />
        )}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
      </>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 5,
    gap:10,
    borderRadius: 5
  },
  selected : {
    backgroundColor:'#D0B5DC'
  },
  unselected : {
    backgroundColor:'#D6CDDA'
  },
  radioButton: {
    
  },
  radioLabel: {
    fontSize: 16,
  },
})

export default CustomRadioButton