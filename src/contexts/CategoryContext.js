import React, { useState, createContext, useEffect } from 'react';
import auth0Client from '../Auth';
import axios from 'axios';

export const CategoryContext = createContext();

export function CategoryProvider(props) {

    const [categories, setCategories] = useState([]);
    

    useEffect(() => {
        async function getCategories(){
            const result = await axios({
                method: 'get',
                url: '/api/categories',
                headers: {
                    Authorization: 'Bearer ' + auth0Client.getIdToken()
                }
            });
            setCategories(result.data);
        }
        getCategories();
    }, []);


    return (
        <CategoryContext.Provider value={[categories, setCategories]}>
            {props.children}
        </CategoryContext.Provider>
    );


}