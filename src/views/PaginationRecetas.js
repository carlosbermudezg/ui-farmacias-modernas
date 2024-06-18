import { View } from "react-native"
import { Button, Text, Icon } from "react-native-paper"
import paginationStyle from "../../assets/styles/pagination"

const PaginationRecetas = ({ page, totalPages, setPage })=>{
    return(
        <View style={ paginationStyle.paginationRecetas }>
            <Button 
                disabled={ page === 1 }
                style={ paginationStyle.paginationButtons }
                mode="outlined" 
                onPress={() => {
                    setPage(page - 1)
                }}>
                <Icon
                    source="arrow-left"
                    color="#662D91"
                    size={20}
            />
            </Button>
            <Text variant="bodySmall">Pagina : { page } de { totalPages }</Text>
            <Button 
                disabled={ page === totalPages }
                style={ paginationStyle.paginationButtons }
                mode="outlined"
                onPress={() => {
                    setPage(page + 1)
                }}>
                <Icon
                    source="arrow-right"
                    color="#662D91"
                    size={20}
                />
            </Button>
        </View>
    )
}

export default PaginationRecetas