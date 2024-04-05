import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { Text } from 'react-native-paper';

const LoadingLogin = ()=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FFF" />
            <Text variant="bodyLarge" style={ { color:'#FFF' } }>Cargando Datos...</Text>
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

export default LoadingLogin