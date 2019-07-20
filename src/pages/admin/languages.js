import React, { useState, useContext } from 'react';
import LanguageList from '../../components/admin/LanguagesList';
import { LanguageProvider, LanguageContext } from '../../contexts/LanguageContext';
import { Redirect } from "react-router-dom";
import Can from "../../components/utils/Can";
import AddLanguage from '../../components/admin/AddLanguage';
import auth0Client from '../../Auth';

function language() {


    return (
        <Can
            role={auth0Client.getRole()}
            perform="dashboard-page:visit"
            yes={() => (
                <LanguageProvider accessToken={auth0Client.getIdToken()}>
                    <div className="jumbotron">
                        <h1 className="display-4">Langue</h1>
                        <p className="lead">Page d'administration pour la gestion des langues dans la base de données</p>
                        <hr className="my-4" />
                        <AddLanguage />
                        <hr className="my-4"></hr>
                        <h1>Gestion des langues</h1>
                        <LanguageList />

                    </div>
                </LanguageProvider>
            )}
            no={() => <Redirect to="/" />}
        />
    )
}

export default language;