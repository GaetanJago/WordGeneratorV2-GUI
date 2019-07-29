import React, { useState, useContext } from 'react';
import CategoriesList from '../../components/admin/category/CategoriesList';
import { CategoryProvider, CategoryContext } from '../../contexts/CategoryContext';
import { Redirect } from "react-router-dom";
import Can from "../../components/utils/Can";
import AddCategory from '../../components/admin/category/AddCategory';
import auth0Client from '../../Auth';

function language() {


    return (
        <Can
            role={auth0Client.getRole()}
            perform="dashboard-page:visit"
            yes={() => (
                <CategoryProvider accessToken={auth0Client.getIdToken()}>
                    <div className="jumbotron">
                        <h1 className="display-4">Catégorie</h1>
                        <p className="lead">Page d'administration pour la gestion des catégories dans la base de données</p>
                        <hr className="my-4" />
                        <AddCategory />
                        <hr className="my-4"></hr>
                        <h1>Gestion des catégories</h1>
                        <CategoriesList />

                    </div>
                </CategoryProvider>
            )}
            no={() => <Redirect to="/" />}
        />
    )
}

export default language;