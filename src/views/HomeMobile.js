import { View } from "react-native"
import FabButton from '../components/FabButton'
import homeStyle from "../../assets/styles/home"
import { Text } from "react-native-paper"
import ProductsContentMobile from "./ProductsContentMobile"
import Pagination from "./Pagination"
import { UseSelector, useSelector } from "react-redux"

const HomeMobile = ()=>{

    const category = useSelector( state => state.category )

    return(
        <View style={ homeStyle.homeContentMobile }>
            <View style={ homeStyle.filterContainerMobile }>
                <View style={ homeStyle.categoriesMobile }>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton label='3%' category={3} icon='star-outline' color='#f69a23' rippleColor='#ffc501'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>3 %</Text>
                    </View>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton label='5%' category={5} icon='star-half-full' color='#F57E25' rippleColor='#fe9600'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>5%</Text>
                    </View>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton label='15%' category={15} icon='star' color='#F26524' rippleColor='#FF5733'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>15%</Text>
                    </View>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton label='Todos' category={0} icon='all-inclusive' color='#662D91' rippleColor='#662D91'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>Todos</Text>
                    </View>
                </View>
            </View>
            <View style={ homeStyle.textResultadosContainer }>
                <Text style={ homeStyle.textResultados }>Resultados</Text>
                <Text style={ homeStyle.textCategory }>
                    {
                        category === 0 ? 'Todos los productos' : `Categoria ${category} %`
                    }
                </Text>
            </View>
            <ProductsContentMobile></ProductsContentMobile>
            <Pagination></Pagination>
        </View>
    )
}

export default HomeMobile