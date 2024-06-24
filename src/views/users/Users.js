import { ScrollView, StyleSheet } from "react-native"
import Navbar from "../../components/Navbar";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../store/slices/users.slice'
import { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import UserCard from "../../components/UserCard";

const Users = ({ navigation, route })=>{

    const [render, setRender] = useState(false)
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()
    const users = useSelector( state => state.users )

    useEffect(()=>{
        const getUsers = async()=>{
            axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users?page=${page}&limit=30`, {
                headers: {
                  Authorization: `Bearer ${await AsyncStorage.getItem("token2")}`
                }
              })
            .then( res => dispatch(setUsers(res.data.data)) )
            .catch( error => console.log( error ) )
        }
        getUsers()
    },[render])
    
    const changeUserStatus = async(userId, status)=>{
        const state = status === 1 ? 0 : 1
        await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/changeStatus?id=${userId}&state=${state}`,{
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token2")}`
            }
          })
            .then( response =>{
                console.log(response)
            } )
            .catch( error => console.log( error ) )
        setRender(!render)
    }

    return(
        <>
            <Navbar navigation={ navigation } route={ route.name } ></Navbar>
            <ScrollView contentContainerStyle={ styles.container }>
                {
                    users?.map((user, index)=>{
                        return(
                            <UserCard key={index} user={user} changeUserStatus={changeUserStatus} ></UserCard>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FFF',
        marginTop: 10,
        width:'80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center',
        gap:10,
        flexDirection:'row',
        flexWrap:'wrap',
        padding:30,
        borderRadius: 5
    }
})

export default Users