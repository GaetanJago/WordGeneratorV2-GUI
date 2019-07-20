import React, {useContext} from 'react';

import Language from './Language';
import {LanguageContext} from '../../contexts/LanguageContext';

const LanguagesList = () => {
    const [languages, setLanguages] = useContext(LanguageContext)
    console.log(languages);
    return (
        <div>
            <table className="table col-4">
                <tbody>
                    {languages.map(language => (
                        <Language key={language._id} _id={language._id} libelle={language.name} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default LanguagesList;