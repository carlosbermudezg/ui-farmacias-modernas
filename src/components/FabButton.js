import { FAB } from "react-native-paper"
import homeStyle from "../../assets/styles/home"
import { useDispatch } from "react-redux"
import { setCategory } from "../store/slices/category.slice"
import { setCategoryUser } from "../store/slices/categoryUser.slice"
import categories from "../utils/Categories"
import { useState } from "react"
import { setPage } from "../store/slices/page.slice"

const FabButton = ({category, icon, color, rippleColor, label})=>{

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const resetCategory = async(category)=>{
        setIsLoading(true)
        if(category != 0){
            dispatch(setCategory(category))
            const filterCategory = categories.filter((element) => element.value === category )
            dispatch(setCategoryUser(
                [
                    filterCategory.map( element => element.id)
                ]
            ))
            dispatch( setPage( 1 ) )
        }else{
            dispatch( setCategory(category) )
            dispatch( setCategoryUser([]) )
            dispatch( setPage( 1 ) )
        }
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    }

    const bg = rippleColor

    return(
        <FAB
            loading={ isLoading }
            icon={icon}
            customSize={40}
            color='#FFF'
            rippleColor={rippleColor}
            style={ { shadowRadius:0, backgroundColor: rippleColor, borderColor:'#f69a23', width:'100%', justifyContent:'center', alignItems:'center' }} 
            onPress={() => {
                resetCategory(category)
            }}
        />
    )
}

export default FabButton