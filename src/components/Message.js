import { useState } from 'react'
import { Text, Button, Icon } from "react-native-paper"
import { View, Image } from "react-native"

const Message = ({item, user})=>{

    const [isHover, setIsHover] = useState(false)

    const handleDownload = async (url) => {
        // Parsea el archivo que recibe para la descarga
        let file = url
        let extension
        let name
        if(typeof url === 'string'){
            file = JSON.parse(url)
            // Extension del archivo
            const extensionMatch = url.match(/[^:/]\w+(?=;|,)/)
            extension = extensionMatch && extensionMatch[0]
        }else{
            const string = JSON.stringify(url)
            // Extension del archivo
            const extensionMatch = string.match(/[^:/]\w+(?=;|,)/);
            extension = extensionMatch && extensionMatch[0];
        }
        // Establece el nombre del archivo
        if(file.fileName){
            name = file.fileName
        }else{
            name = nombreAleatorio(10)
        }

        // Crea el link
        const link = document.createElement('a')
        link.href = file.uri
        link.download = name
        document.body.appendChild(link)
        link.click()
        
        // Limpia después de la descarga
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // if(Platform.OS === 'web'){
        //     // Obtener el tipo MIME desde la cadena Base64
        //     const typeMatch = base64String.match(/^data:([^;]+);base64,/);
        //     const fileType = typeMatch && typeMatch[1];

        //     // Decodifica la cadena Base64
        //     const decodedString = Base64.atob(base64String);

        //     // Buscar la extensión en la cadena Base64
        //     const extensionMatch = base64String.match(/[^:/]\w+(?=;|,)/);
        //     const extension = extensionMatch && extensionMatch[0];

        //     // Crear un Blob a partir de los datos decodificados
        //     const blob = new Blob([decodedString], { type: fileType });

        //     // Crear un objeto URL para el Blob y descargar la imagen
        //     const url1 = URL.createObjectURL(blob);
        //     const link = document.createElement('a');
        //     link.href = url1;
        //     link.download = `archivo.${extension}`;
        //     document.body.appendChild(link);
        //     link.click();

        //     // Limpiar después de la descarga
        //     document.body.removeChild(link);
        //     URL.revokeObjectURL(url);
        // }else{
        //     try {
        //         const { status } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename);
        //         if (status === 200) {
        //           console.log('Descarga exitosa');
        //         } else {
        //           throw new Error('Error al descargar la imagen');
        //         }
        //       } catch (error) {
        //         console.error('Error al descargar la imagen:', error);
        //       }
        // }
    };

    const nombreAleatorio = longitud => {
        // Nota: no uses esta función para cosas criptográficamente seguras. 
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < longitud; i++) {
            // Lee más sobre la elección del índice aleatorio en:
            // https://parzibyte.me/blog/2021/11/30/elemento-aleatorio-arreglo-javascript/
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        return aleatoria;
    };

    const fileParse = (url)=>{
        let file = url
        let extension
        let uri

        if(typeof file != 'string'){
            const string = JSON.stringify(file)
            // Extension del archivo
            const extensionMatch = string.match(/[^:/]\w+(?=;|,)/)
            extension = extensionMatch && extensionMatch[0]

            const uriData = JSON.parse(string)

            uri = uriData.uri
        }
        else{
            file = JSON.parse(file)
            // Extension del archivo
            const extensionMatch = url.match(/[^:/]\w+(?=;|,)/)
            extension = extensionMatch && extensionMatch[0]

            uri = file.uri
        }

        if(extension === 'png' || extension === 'jpg' || extension === 'jpeg'){
            return(
                <Image source={ { uri: uri } } style={ { width: 150, height:150, backgroundColor:'#FFF' } } />
            )
        }
        if(extension === '.document'){
            return(
                <View style={ {backgroundColor:'#FFF', width:150, height:150, justifyContent:'center', alignItems:'center'} }>
                    <Icon
                        source="file-word"
                        color='#2980B9'
                        size={45}
                    />
                </View>
            )
        }
        if(extension === 'pdf'){
            return(
                <View style={ {backgroundColor:'#FFF', width:150, height:150, justifyContent:'center', alignItems:'center'} }>
                    <Icon
                        source="file-pdf-box"
                        color='#E74C3C'
                        size={45}
                    />
                </View>
            )
        }
        if(extension === '.sheet'){
            return(
                <View style={ {backgroundColor:'#FFF', width:150, height:150, justifyContent:'center', alignItems:'center'} }>
                    <Icon
                        source="file-excel"
                        color='#148F77'
                        size={45}
                    />
                </View>
            )
        }
        if(extension === 'plain'){
            return(
                <View style={ {backgroundColor:'#FFF', width:150, height:150, justifyContent:'center', alignItems:'center'} }>
                    <Icon
                        source="file-document"
                        color='#5D6D7E'
                        size={45}
                    />
                </View>
            )
        }
    }

    return(
        <View style={ { gap: 5 } }>
            {
                item.image != 'null' && item.image != null && 
                <View
                    style={ 
                        { 
                            position: 'relative', 
                            justifyContent:'center', 
                            alignItems:'center',
                            alignSelf: item.userSend != user.idusers ? 'flex-start' : 'flex-end',
                            overflow:'hidden',
                            borderRadius:10
                        } 
                    }
                    onPointerEnter={()=> setIsHover(true)} 
                    onPointerLeave={()=> setIsHover(false)}
                >
                    { isHover && 
                        <Button 
                            style={ 
                                {
                                    position: 'absolute',
                                    backgroundColor:'#FFF',
                                    zIndex:2,
                                }    
                            }
                            icon="download" 
                            mode="outlined" 
                            onPress={()=> handleDownload(item.image)}
                        >
                            Descargar
                        </Button>
                    }
                    {
                        fileParse(item.image)
                    }
                </View>
            }
            {
                item.content != '' &&

                <Text
                style={ 
                    { 
                        position:'relative',
                        alignSelf: item.userSend != user.idusers ? 'flex-start' : 'flex-end',
                        backgroundColor: item.userSend != user.idusers ? '#FFF' : '#A569BD',
                        color: item.userSend != user.idusers ? '#283747' : '#FFF',
                        padding:10,
                        borderRadius: 20,
                        shadowColor: "#283747",
                        maxWidth:'50%',
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        elevation: 16, // Android
                    }
                } 
                >{ item.content }</Text>
            }
            <Text variant="labelSmall"
                style={ 
                    { 
                        alignSelf: item.userSend != user.idusers ? 'flex-start' : 'flex-end',
                        color: '#808B96'
                    } 
                }
            >{ item.date }</Text>
        </View>
    )
}

export default Message