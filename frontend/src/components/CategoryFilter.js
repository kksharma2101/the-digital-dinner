// src/components/CategoryFilter.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, fetchMenuCategories, setSelectedCategory } from '../redux/reducers/menuReducer';
import styled from 'styled-components';

const CategoryFilterContainer = styled.div`
    margin-bottom: 20px;
`;

const CategoryButton = styled.button`
    padding: 8px 15px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    background-color: white;

    &:hover {
        background-color: #f0f0f0;
    }

    &.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
`;

function CategoryFilter() {
    const dispatch = useDispatch();
    const { categories, loading: categoriesLoading, error: categoriesError, selectedCategory } = useSelector(state => state.menu);

    useEffect(() => {
        dispatch(fetchMenuCategories());
    }, [dispatch]);

    const handleCategorySelect = (category) => {
        dispatch(setSelectedCategory(category));
        dispatch(fetchMenu(category));
    };

    if (categoriesLoading) {
        return <div>Loading categories...</div>;
    }

    if (categoriesError) {
        return <div>Error loading categories: {categoriesError}</div>;
    }

    return (
        <CategoryFilterContainer>
            <CategoryButton onClick={() => handleCategorySelect(null)} className={selectedCategory === null ? 'active' : ''}>
                All
            </CategoryButton>
            {categories.map(category => (
                <CategoryButton
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={selectedCategory === category ? 'active' : ''}
                >
                    {category}
                </CategoryButton>
            ))}
        </CategoryFilterContainer>
    );
}

export default CategoryFilter;