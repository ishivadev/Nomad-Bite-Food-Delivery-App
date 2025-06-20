import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItemCart/FoodItem'

const FoodDisplay = ( {onCategory} ) => {

    const {food_list} = useContext(StoreContext)
    //console.log(food_list);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes are waiting near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index)=>{
            //console.log(item._id);
            if(onCategory === 'All' || onCategory === item.category) {
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }
            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
