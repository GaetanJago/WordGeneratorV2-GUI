import React, { useContext, useState } from 'react';
import auth0Client from '../../../Auth';
import { CategoryContext } from '../../../contexts/CategoryContext';
import axios from 'axios';

function AddCategory(props) {
    const [categories, setCategories] = useContext(CategoryContext);

    const [libelleNewCategory, setLibelleNewCategory] = useState('');

    const handleChange = (event) => {
        setLibelleNewCategory(event.target.value);
    }

    const insertCategory = (accessToken) => {
        axios({
            method: 'post',
            url: '/api/categories',
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            data: { "name": libelleNewCategory } // the body
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setCategories(prevCategories => [...prevCategories, response.data]);
            }
        })
    }


    return (
        <div>
            <h2 className="display-6">Ajouter une catégorie</h2>
            <div className="row">
                <input id="insertInput" value={libelleNewCategory} onChange={handleChange} type="text" className="form-control" placeholder="Nom de la catégorie" style={{ width: '20em' }} />
                <button type="button" className="btn btn-success" onClick={() => insertCategory(auth0Client.getIdToken())}>Insérer</button>
            </div>
        </div>
    );
}

export default AddCategory;