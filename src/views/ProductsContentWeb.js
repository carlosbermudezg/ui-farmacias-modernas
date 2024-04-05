import homeStyle from "../../assets/styles/home"
import { ScrollView, Platform } from "react-native";
import { DataTable, Avatar, IconButton, Card, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import categories from "../utils/Categories";

const ProductsContentWeb = ()=>{

    const renderProducts = useSelector( state => state.renderProducts)

    return(
        <ScrollView contentContainerStyle={ homeStyle.table }>
            {
                Platform.OS === 'web'?
                <DataTable>
                    <DataTable.Header>
                    <DataTable.Title>Porcentaje</DataTable.Title>
                        <DataTable.Title>Producto</DataTable.Title>
                        <DataTable.Title numeric>Stock</DataTable.Title>
                    </DataTable.Header>
                        {
                            renderProducts?.map((product, index)=>{
                                const category = categories.find((element) => element.id == product.CATEGORIA);
                                const porcentaje = category === undefined ? '0%' : `${ category.value }%`
                                const stock = Number(product.CANTIDAD) + Number(product.b1) + Number(product.b2)
                                return(
                                    <DataTable.Row key={index}>
                                    <DataTable.Cell>
                                        <Button 
                                            style={ { backgroundColor: category === undefined ? '#662D91' : category.color, borderRadius: 5 } }
                                            icon={ category === undefined ? 'all-inclusive' : category.icon }  mode="contained"
                                        >
                                            { porcentaje }
                                        </Button>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={ homeStyle.producto }>{ product.PRODUCTO }</DataTable.Cell>
                                    <DataTable.Cell numeric>{ stock }</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                </DataTable>:
                renderProducts.map((product, index)=>{
                    const category = categories.find((element) => element.id == product.CATEGORIA);
                        return(
                            <Card.Title style={ homeStyle.productCard } key={ index }
                                title={ product.PRODUCTO }
                                subtitle={`Cantidad en Stock: ${product.CANTIDAD}`}
                                left={(props) => <Avatar.Icon key={ index} {...props} icon="folder" />}
                                right={(props) => <IconButton key={ index } {...props} icon="dots-vertical" onPress={() => {}} />}
                            />
                        )
                })
            }
        </ScrollView>
    )
}

export default ProductsContentWeb