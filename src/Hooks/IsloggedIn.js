import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
const useIsloggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkToken = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
        }
    };
    checkToken();
    return isLoggedIn
}

export default useIsloggedIn
