import React, { useState, createContext, useEffect } from 'react';
import auth0Client from '../Auth';
import axios from 'axios';

export const LanguageContext = createContext();

export function LanguageProvider(props) {

    const [languages, setLanguages] = useState([]);
    

    useEffect(() => {
        async function getLanguages(){
            const result = await axios({
                method: 'get',
                url: '/api/languages',
                headers: {
                    Authorization: 'Bearer ' + auth0Client.getIdToken()
                }
            });
            //console.log(result)
            setLanguages(result.data);
        }
        getLanguages();
    }, []);


    return (
        <LanguageContext.Provider value={[languages, setLanguages]}>
            {props.children}
        </LanguageContext.Provider>
    );


}

/*export class LanguageProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            languages: []
        }
    }



    componentDidMount(){
        axios({
            method: 'get',
            url: '/api/languages',
            headers: {
                Authorization: 'Bearer ' + this.props.accessToken
            }
        }).then(response => {
            this.setState({languages: response.data});
        })
    }

    render() {
        return (
            <LanguageContext.Provider value={[this.state.languages, this.state.setLanguages]}>
                {this.props.children}
            </LanguageContext.Provider>
        );
    }

}*/