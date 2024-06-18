import axios from "axios";

const register = async (data) => {
  try {
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users`, data);
    console.log('registrado');
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export default register;