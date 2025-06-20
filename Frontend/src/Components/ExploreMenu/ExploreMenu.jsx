import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({onCategory, onSetCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu-id'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Discover a vibrant menu that showcases a rich tapestry of flavors and cuisines. Our passion is to craft unforgettable dining experiences, carefully curating each dish to delight your senses and leave you craving for more.</p>
      <div className="explore-menu-list">

        {menu_list.map((item, index)=> {
            return (
                <div onClick={()=> onSetCategory(prev => prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={onCategory === item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
        
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
