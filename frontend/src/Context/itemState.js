'use client'

import { useState } from "react";
import itemContext from "./itemContext";

const ItemState = ({children}) => {
  // const host = "http://localhost:3000";
  const [items, setItems] = useState([]);

  // Helper function for fetch options
  const fetchOptions = (method, body = null) => ({
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  // Get all items
  const getItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/get-items`, fetchOptions('GET'));
    const json = await response.json();
    setItems(json);
  };

  // Add an item
  const addItem = async (userName, itemName, price, description) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/add-items`, fetchOptions('POST', {userName, itemName, price, description }));
    const item = await response.json();
    setItems(items.concat(item));
  };

  // Delete an item
  const deleteItem = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/Deleteitem/${id}`, fetchOptions('DELETE'));
    const json = await response.json();
    console.log(json);
    const updatedItems = items.filter((item) => item._id !== id);
    setItems(updatedItems);
  };

  // Edit an item
  const updateItem = async (id, userName, itemName, price, description) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/Updateitem/${id}`, fetchOptions('PUT', { userName, itemName, price, description }));
    const json = await response.json();
    console.log(json);

    let updatedItems = JSON.parse(JSON.stringify(items));
    for (let index = 0; index < updatedItems.length; index++) {
      const element = updatedItems[index];
      if (element._id === id) {
        updatedItems[index].userName = userName;
        updatedItems[index].itemName = itemName;
        updatedItems[index].price = price;
        updatedItems[index].description = description;
        break;
      }
    }
    setItems(updatedItems);
  };

  // Add a schedule to an item
  const addSchedule = async (id, scheduleData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/${id}/schedule`, fetchOptions('POST', scheduleData));
    const updatedItem = await response.json();
    setItems(items.map((item) => (item._id === id ? updatedItem : item)));
  };

  

  


  const deleteSchedule = async (id, scheduleId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/${id}/schedule/${scheduleId}/delete`, fetchOptions('DELETE'));
        
        if (response.ok) {
            // Handle the case where response might be empty
            try {
                await response.json(); // This will succeed for empty JSON responses
            } catch (error) {
                console.warn('Response is empty or not valid JSON');
            }
            // Update the local state after deletion
            const updatedItem = items.find((item) => item._id === id);
            if (updatedItem) {
                updatedItem.schedules = updatedItem.schedules.filter(schedule => schedule._id !== scheduleId);
                setItems(items.map((item) => (item._id === id ? updatedItem : item)));
            }
        } else {
            throw new Error('Failed to delete schedule');
        }
    } catch (error) {
        console.error('Error deleting schedule:', error);
    }
};


  return (
    <itemContext.Provider value={{ items, addItem, deleteItem, updateItem, getItems, addSchedule, deleteSchedule }}>
      {children}
    </itemContext.Provider>
  );
};

export default ItemState;
