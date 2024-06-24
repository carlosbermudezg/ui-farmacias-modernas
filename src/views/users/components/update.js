import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const update = async (data) => {
  const token = await AsyncStorage.getItem('token2')
  console.log(token)
  try {
    await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/users`, data, { 
      headers: {
          Authorization: `Bearer ${token}`
        } 
      });
    return true;
  } catch (error) {
    return false;
  }
};

export default update;