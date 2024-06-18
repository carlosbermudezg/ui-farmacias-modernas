import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'

import { Provider } from 'react-redux'
import store from './src/store'

import Login from './src/views/login/Login'
import Main from './src/views/Main'
import Data from './src/views/register/Data'
import UserType from './src/views/register/UserType'
import Brands from './src/views/register/Brands'
import Zones from './src/views/register/Zones'
import Password from './src/views/register/Password'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  colors: {
    background: 'transparent',
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
              <Stack.Screen name="Data" component={Data}/>
              <Stack.Screen name="UserType" component={UserType}/>
              <Stack.Screen name="Brands" component={Brands}/>
              <Stack.Screen name="Zones" component={Zones}/>
              <Stack.Screen name="Password" component={Password}/>
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
    backgroundColor:'transparent',
  }
});
