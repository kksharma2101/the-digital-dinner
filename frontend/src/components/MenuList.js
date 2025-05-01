import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';
import { addItem } from '../redux/reducers/cartReducer';

const MenuListContainer = styled.div`
    // Styles for the menu list
`;

const MenuItemContainer = styled.div`
    border: 1px solid #eee;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    display: flex;
    gap: 20px;
    align-items: center;
`;

const ItemDetails = styled.div`
    flex-grow: 1;
`;

const AddToCartButton = styled.button`
    padding: 8px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

function MenuList() {
    const { items, loading, error } = useSelector(state => state.menu);
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addItem(item));
    };

    if (loading) {
        return <div>Loading menu...</div>;
    }

    if (error) {
        return <div>Error loading menu: {error}</div>;
    }

    return (
        <MenuListContainer>
            <h2>Our Menu</h2>
            <CategoryFilter />
            {items.map(item => (
                <MenuItemContainer key={item._id}>
                    {item.image && <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />}
                    <ItemDetails>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span>${item.price.toFixed(2)}</span>
                    </ItemDetails>
                    <AddToCartButton onClick={() => handleAddToCart(item)}>Add to Cart</AddToCartButton>
                </MenuItemContainer>
            ))}
        </MenuListContainer>
    );
}

export default MenuList;