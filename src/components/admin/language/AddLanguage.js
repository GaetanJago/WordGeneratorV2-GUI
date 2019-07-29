import React, { useContext, useState } from 'react';
import auth0Client from '../../../Auth';
import { LanguageContext } from '../../../contexts/LanguageContext';
import axios from 'axios';

function AddLanguage(props) {
    const [languages, setLanguages] = useContext(LanguageContext);

    const [libelleNewLanguage, setLibelleNewLanguage] = useState('');

    const handleChange = (event) => {
        setLibelleNewLanguage(event.target.value);
    }

    const insertLanguage = (accessToken) => {
        axios({
            method: 'post',
            url: '/api/languages',
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            data: { "name": libelleNewLanguage } // the body
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setLanguages(prevLanguages => [...prevLanguages, response.data]);
            }
        })
    }


    return (
        <div>
            <h2 className="display-6">Ajouter une langue</h2>
            <div className="row">
                <input id="insertInput" value={libelleNewLanguage} onChange={handleChange} type="text" className="form-control" placeholder="Nom de la langue" style={{ width: '20em' }} />
                <button type="button" className="btn btn-success" onClick={() => insertLanguage(auth0Client.getIdToken())}>Insérer</button>
            </div>
        </div>
    );
}

export default AddLanguage;