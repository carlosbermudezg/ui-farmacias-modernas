import { View, Text, Image } from "react-native"
import loginStyle from "../../assets/styles/login"

import DataTable, { COL_TYPES } from 'react-native-datatable-component';

const LogoFarmaciasLopez =  require('../../public/farmacias-lopez.jpg')

const Home = ()=>{
    return(
        <>
        <View style={ loginStyle.loginWrap }>
            <View style={ loginStyle.table }>
                <DataTable
                    data={[ 
                        { name: 'Muhammad Rafeh', age: 21, gender: 'male' },
                        { name: 'Muhammad Akif', age: 22, gender: 'male' },
                        { name: 'Muhammad Umar', age: 21, gender: 'male' },
                        { name: 'Amna Shakeel', age: 22, gender: 'female' },
                        { name: 'Muhammad Ammar', age: 20, gender: 'male' },
                        { name: 'Muhammad Moiz', age: 13, gender: 'male' }
                    ]} // list of objects
                    colNames={['name', 'age', 'gender']} //List of Strings
                    colSettings={[
                    { name: 'name', type: COL_TYPES.STRING, width: '40%' }, 
                    { name: 'age', type: COL_TYPES.INT, width: '30%' }, 
                    { name: 'gender', type: COL_TYPES.STRING, width: '30%' }
                    ]}//List of Objects
                    noOfPages={2} //number
                    backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
                    headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
                />
            </View>
        </View>
        </>
    )
}

export default Home