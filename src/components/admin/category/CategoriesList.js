import React, {useContext} from 'react';

import Category from './Category';
import {CategoryContext} from '../../../contexts/CategoryContext';

const CategoriesList = () => {
    const [categories, setCategories] = useContext(CategoryContext)
    return (
        <div>
            <table className="table col-4">
                <tbody>
                    {categories.map(category => (
                        <Category key={category._id} _id={category._id} libelle={category.name} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default CategoriesList;