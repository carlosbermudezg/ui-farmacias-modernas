import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { io } from 'socket.io-client/dist/socket.io'

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ url, children }) => {
    
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = async()=>{
        const token = await AsyncStorage.getItem('token')
        const user = await AsyncStorage.getItem('user')
        const socket = io(url, {
            query: {
                "user" : user,
                "token" : token
            }
        })
        setSocket(socket);

        socket.on('mensaje', (data) => {
          setMessage(data);
        });
    }
    socket()
  }, [url]);

  return (
    <SocketContext.Provider value={{socket, message}}>
      {children}
    </SocketContext.Provider>
  );
};