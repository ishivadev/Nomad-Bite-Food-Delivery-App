import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ( {id, name, description, price, image} ) => {
  
  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
  
  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-image' src={url+"/images/"+image} alt='food_image' /> 
            
            {!cartItems[id]
                ?<img className='add-icon' onClick={()=> addToCart(id)} src={assets.add_icon_white} alt='add-icon' />
                :<div className='food-item-counter'>
                    <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red} alt='remove-icon'/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt='add-icon'/>
                </div>
            }
        
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt='rating' />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem
