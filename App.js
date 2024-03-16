import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import Login from './src/views/Login';
import Main from './src/views/Main'
import Register from './src/views/Register';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  colors: {
    background: '#112f8f',
  },
};

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="light"/>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  navContainer:{
    backgroundColor:'#FFF'
},
  container: {
    flex: 1,
    backgroundColor:'#112f8f'
  }
});
