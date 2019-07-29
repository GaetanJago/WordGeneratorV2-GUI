import React, {useContext, useState } from 'react';
import auth0Client from '../../../Auth';
import { LanguageContext } from '../../../contexts/LanguageContext';
import axios from 'axios';

function Language(props) {
    const [libelle, setLibelle] = useState(props.libelle);
    const [libelleCopy, setLibelleCopy] = useState(props.libelle);
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    let [languages, setLanguages] = useContext(LanguageContext);

    const handleChange = (event) => {
        setLibelleCopy(event.target.value);
    }

    const saveChange = (accessToken) => {
        axios({
            method: 'put',
            url: '/api/languages/' + props._id,
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            data: { "name": libelleCopy } // the body
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setLibelle(libelleCopy);
                setIsBeingEdited(false);
            }
        })
    }

    const deleteLanguage = (accessToken) => {

        axios({
            method: 'delete',
            url: '/api/languages/' + props._id,
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(response => {
            if (response.status === 200) {
                const index = languages.findIndex(language => language._id === props._id);
                const newLanguages = languages.slice();
                newLanguages.splice(index, 1);
                setLanguages(newLanguages);
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
                    <td><button type="button" className="btn btn-danger" onClick={() => deleteLanguage(auth0Client.getIdToken())}>Supprimer</button></td>
                )}

        </tr>
    );

}


/*class Language extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            id: props._id,
            libelle: props.libelle,
            copyLibelle: props.libelle,
            isBeingEdited: false,
            isDeleleted: false
        }
    }

    handleChange = (event) => {
        this.setState({ copyLibelle: event.target.value })
        console.log(this.state.copyLibelle);
    }

    saveChange = (accessToken) => {
        axios({
            method: 'put',
            url: '/api/languages/' + this.state.id,
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            data: { "name": this.state.copyLibelle } // the body
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.setState({ libelle: this.state.copyLibelle, isBeingEdited: false });
            }
        })

        //const [languages, setLanguages] = useContext(LanguageContext);


        //this.setState({ libelle: this.state.copyLibelle })


    }

    deleteLanguage = (accessToken) => {
        
        console.log(languages);
        axios({
            method: 'delete',
            url: '/api/languages/' + this.state.id,
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(response => {
            const [languages, setLanguages] = useContext(LanguageContext);
            c
            console.log(response);
            
        })
    }

    render() {
        const { libelle, copyLibelle, isBeingEdited, isDeleleted } = this.state;
        return (
            <AuthConsumer>
                {({ user, accessToken }) => (
                <tr>
                    {isBeingEdited ? (
                        <td><input type="text" value={copyLibelle} onChange={this.handleChange}></input></td>
                    ) : (
                            <td>{libelle}</td>
                        )}
                    {isBeingEdited ? (
                        <td><button type="button" className="btn btn-success" onClick={() => this.saveChange(accessToken)} >Sauvegarder</button></td>
                    ) : (
                            <td><button type="button" className="btn btn-primary" onClick={() => this.setState({ 'isBeingEdited': true })} >Modifier</button></td>
                        )}
                    {isBeingEdited ? (
                        <td><button type="button" className="btn btn-secondary" onClick={() => this.setState({ 'isBeingEdited': false })}>Annuler</button></td>
                    ) : (
                            <td><button type="button" className="btn btn-danger" onClick={() => this.deleteLanguage(accessToken)}>Supprimer</button></td>
                        )}

                </tr>
                )}
            </AuthConsumer>
        );
    }

}*/

export default Language;