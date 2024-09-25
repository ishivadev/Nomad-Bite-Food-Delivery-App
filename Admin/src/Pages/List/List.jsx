import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ( {url}) => {
  // const url = "http://localhost:4000";

  const [list, setList] = useState([]);

  //Food list data
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      //console.log(response.data);
      toast.success("Food list fetched successfully!");
    } else {
      toast.error("Error...");
      toast.error(response.data.message.message);
    }
  };

  //Remove food as per foodId
  const removeFood = async (foodId) => {
      console.log(foodId);
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
      await fetchList();
      if(response.data.success){
          toast.success(response.data.message)
      } else {
          toast.success("Error")
      }
    }

  //To run some side-effects (like making API calls, setting timers, or updating the DOM) after rendering a component. It's a way to handle tasks that need to be performed after the component has been rendered, but are not part of the rendering process itself.
  useEffect(()=>{
    fetchList();
  },[])



  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>S.No</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
          return(
            <div key={index} className="list-table-format">
               <p>{index+1}</p>
                <img src={`${url}/images/`+item.image} alt='food-image' />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeFood(item._id)} className="cursor">X</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default List;
