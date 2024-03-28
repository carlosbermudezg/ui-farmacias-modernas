import { View } from "react-native"
import FabButton from '../components/FabButton'
import homeStyle from "../../assets/styles/home"
import { Text } from "react-native-paper"
import ProductsContentMobile from "./ProductsContentMobile"
import Pagination from "./Pagination"

const HomeMobile = ()=>{

    return(
        <View style={ homeStyle.homeContentMobile }>
            <View style={ homeStyle.filterContainerMobile }>
                <View style={ homeStyle.categoriesMobile }>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton category={3} icon='arm-flex-outline' color='#f69a23' rippleColor='#f69a23'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>3 %</Text>
                    </View>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton category={5} icon='check-decagram-outline' color='#F57E25' rippleColor='#F57E25'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>5%</Text>
                    </View>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton category={15} icon='shield-star-outline' color='#F26524' rippleColor='#F26524'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>15%</Text>
                    </View>
                    <View style={ homeStyle.iconContainer }>
                        <FabButton category={0} icon='all-inclusive' color='#662D91' rippleColor='#662D91'>
                        </FabButton>
                        <Text style={ homeStyle.iconText }>Todos</Text>
                    </View>
                </View>
            </View>
            <ProductsContentMobile></ProductsContentMobile>
            <Pagination></Pagination>
        </View>
    )
}

export default HomeMobile