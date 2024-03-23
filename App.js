import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import { Provider } from 'react-redux'
import store from './src/store'

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
    <Provider store={ store }>
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
    </Provider>
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
