import Home from './Home';
import Permisos from './Permisos';
import Users from './Users'

import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Main = ()=>{
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={ Home } />
            <Drawer.Screen name="Permisos" component={ Permisos } />
            <Drawer.Screen name="Users" component={ Users } />
        </Drawer.Navigator>
    )
}

export default Main