import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './src/views/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Login></Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor:'#F26525'
  }
});
