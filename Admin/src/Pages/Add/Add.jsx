import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  // const url = "http://localhost:4000"
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    category:""
  })

  /*This function is called whenever the user types something in one of the form fields (e.g., name, description, price, or category). The function takes an event object as an argument, which contains information about the field that triggered the event.
  Inside the onChangeHandler function, we declare two const variables: name and value. These variables are used to extract the name and value of the field that triggered the event.
  const name = event.target.name; extracts the name attribute of the field (e.g., "name", "description", "price", or "category").
  const value = event.target.value; extracts the current value of the field (e.g., the text entered by the user).
  */
  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data =>({...data, [name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle the form data here
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: ""
        }),
        setImage(false);
        toast.success(response.data.message)
    }
    else {
        toast.error(response.data.message.error)
    }
  }

  // useEffect(() => {
  //   console.log(data);
    
  // },[data])


  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor='image'>
                <img src={image?URL.createObjectURL(image):assets.upload_area } alt='upload_area'/>
            </label>
            {/* //When the user selects a file, call the setImage function with the first selected file.    //Input field for selecting an image file. The 'hidden' attribute makes the input field invisible, while the 'required' attribute ensures that a file must be selected before submitting the form. */}
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' />
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                  <p>Product category</p>
                  <select onChange={onChangeHandler} value={data.category} name='category' className="category">
                    <option value="">Select value</option>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                  </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
            </div>
        </div>
        <button type='submit' className='add-btn' >ADD</button>
      </form>
    </div>
  )
}

export default Add
