import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { Text, Icon } from 'react-native-paper';

const ErrorData = ()=>{
    return(
        <View style={styles.container}>
            <Icon
                source="alert-remove-outline"
                color='#F57E25'
                size={36}
            />
            <Text variant="bodyLarge" style={ { color:'#FFF' } }>Ha Ocurrido un error...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#662D91',
      gap:20,
      justifyContent:'center',
      alignItems:'center'
    }
});

export default ErrorData