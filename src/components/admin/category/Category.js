import React, {useContext, useState } from 'react';
import auth0Client from '../../../Auth';
import { CategoryContext } from '../../../contexts/CategoryContext';
import axios from 'axios';

function Category(props) {
    const [libelle, setLibelle] = useState(props.libelle);
    const [libelleCopy, setLibelleCopy] = useState(props.libelle);
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    let [categories, setCategories] = useContext(CategoryContext);

    const handleChange = (event) => {
        setLibelleCopy(event.target.value);
    }

    const saveChange = (accessToken) => {
        axios({
            method: 'put',
            url: '/api/categories/' + props._id,
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            data: { "name": libelleCopy } // the body
        }).then(response => {
            if (response.status === 200) {
                setLibelle(libelleCopy);
                setIsBeingEdited(false);
            }
        })
    }

    const deleteCategory = (accessToken) => {

        axios({
            method: 'delete',
            url: '/api/categories/' + props._id,
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(response => {
            if (response.status === 200) {
                const index = categories.findIndex(language => language._id === props._id);
                const newCategory = categories.slice();
                newCategory.splice(index, 1);
                setCategories(newCategory);
            }
        })
    }

    return (
        <tr>
            {isBeingEdited ? (
                <td><input type="text" value={libelleCopy} onChange={handleChange}></input></td>
            ) : (
                    <td>{libelle}</td>
                )}
            {isBeingEdited ? (
                <td><button type="button" className="btn btn-success" onClick={() => saveChange(auth0Client.getIdToken())} >Sauvegarder</button></td>
            ) : (
                    <td><button type="button" className="btn btn-primary" onClick={() => setIsBeingEdited(true)}>Modifier</button></td>
                )}
            {isBeingEdited ? (
                <td><button type="button" className="btn btn-secondary" onClick={() => setIsBeingEdited(false)}>Annuler</button></td>
            ) : (
                    <td><button type="button" className="btn btn-danger" onClick={() => deleteCategory(auth0Client.getIdToken())}>Supprimer</button></td>
                )}

        </tr>
    );

}

export default Category;