'use client'

//All imports of this component//

import React, { useContext, useEffect, useState } from 'react';
import itemContext from '../../Context/itemContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



const Dashboard = () => {
    const { items, getItems, addItem, deleteItem, updateItem, addSchedule, deleteSchedule } = useContext(itemContext);

    const [newItem, setNewItem] = useState({ userName: '', itemName: '', price: '', description: '' });
    const [schedule, setSchedule] = useState({ frequency: '', quantity: '', startDate: '', endDate: '' });
    const [updatedItem, setUpdatedItem] = useState({ userName: '', itemName: '', price: '', description: '' });
    const [modalType, setModalType] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);

//useEffect//


    useEffect(() => {
        getItems();
    }, []);


//handleOpenModal//    

    const handleOpenModal = (type, itemId = null) => {
        setModalType(type);
        setSelectedItemId(itemId);

        if (itemId) {
            const item = items.find(i => i._id === itemId);
            setUpdatedItem({ userName: item.userName, itemName: item.itemName, price: item.price, description: item.description });
        } else {
            setNewItem({ userName: '', itemName: '', price: '', description: '' });
        }
    };

    

  //handleCloseModal//  

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedItemId(null);
        setUpdatedItem({ userName: '', itemName: '', price: '', description: '' });
    };

    //handleAddItem//

    const handleAddItem = () => {
        addItem(newItem.userName, newItem.itemName, newItem.price, newItem.description);
        setNewItem({ userName: '', itemName: '', price: '', description: '' });
    };

    //handleDeleteItem//

    const handleDeleteItem = (id) => {
        deleteItem(id);
    };

    

    //handleUpdateItem//

    const handleUpdateItem = () => {
        updateItem(selectedItemId, updatedItem.userName, updatedItem.itemName, updatedItem.price, updatedItem.description);
        handleCloseModal();
    };
    
    //handleAddSchedule//

    const handleAddSchedule = (id) => {
    
        addSchedule(selectedItemId, schedule);

        setSchedule({ frequency: '', quantity: '', startDate: '', endDate: '' });

        handleCloseModal();

    };

    
    
//handleDeleteSchedule//
    
    const handleDeleteSchedule = (itemId, scheduleId) => {
        deleteSchedule(itemId, scheduleId);
    
        // Update the state to remove the deleted schedule
        const updatedItems = items.map(item => {
            if (item._id === itemId) {
                return {
                    ...item,
                    schedules: item.schedules.filter(schedule => schedule._id !== scheduleId)
                };
            }
            return item;
        });
    
        setSchedule(updatedItems);
    };
    

    return (
        <div className='px-[2rem]'>
            <h2 className="text-2xl font-bold mb-4 mt-4">Your Items</h2>

            {/* Form to Add New Item */}
            <div className='space-y-2'>
                <Input
                    type="text"
                    placeholder="User Name"
                    value={newItem.userName}
                    onChange={(e) => setNewItem({ ...newItem, userName: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.itemName}
                    onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Item Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <Button className="mb-5 mt-5" onClick={handleAddItem}>Add Item</Button>
            </div>

            {/* Display Items in a Table */}
            <Table className="mt-5">
                <TableCaption>A list of your items.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                                {/* <Button onClick={() => handleUpdateItem(item._id, { userName: item.userName, itemName: item.itemName, price: item.price, description: item.description })}>Edit</Button> */}
                                 <div className="mt-5 flex space-x-4">
                                 <Button onClick={() => handleOpenModal('updateItem', item._id)}>Edit</Button>


                                <Button onClick={() => handleDeleteItem(item._id)}>Delete</Button>
 

                                <Button onClick={() => handleOpenModal('addSchedule', item._id)}>Add Schedule</Button>

                                 </div>
                                

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


         
               {/* Display Schedule */}

<h3 className="text-xl font-bold mt-8">Schedules</h3>
            {items.map((item) => (
                <div key={item._id}>
                    
                    <Table>
                        <TableCaption>Schedules for {item.itemName}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {item.schedules.map((schedule) => (
                                <TableRow key={schedule._id}>
                                    <TableCell>{schedule.frequency}</TableCell>
                                    <TableCell>{schedule.quantity}</TableCell>
                                    <TableCell>{schedule.startDate}</TableCell>
                                    <TableCell>{schedule.endDate}</TableCell>
                                    <TableCell>
                                        {/* <Button onClick={() => handleOpenModal('updateSchedule', item._id, schedule._id)}>Edit</Button> */}
                                        <Button onClick={() => handleDeleteSchedule(item._id, schedule._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}



            
            
                          {/* Modal */}


{modalType && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-3xl p-4 mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b pb-2">
                <h1 className="text-xl font-semibold">
                    {modalType === 'addSchedule' ? 'Add Schedule' : 'Update Item'}
                </h1>
                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div className="py-4">
                <form>
                    {modalType === 'addSchedule' ? (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Frequency</label>
                                <Input
                                    type="text"
                                    value={schedule.frequency}
                                    onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Quantity</label>
                                <Input
                                    type="text"
                                    value={schedule.quantity}
                                    onChange={(e) => setSchedule({ ...schedule, quantity: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Start Date</label>
                                <Input
                                    type="date"
                                    value={schedule.startDate}
                                    onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">End Date</label>
                                <Input
                                    type="date"
                                    value={schedule.endDate}
                                    onChange={(e) => setSchedule({ ...schedule, endDate: e.target.value })}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">User Name</label>
                                <Input
                                    type="text"
                                    value={updatedItem.userName}
                                    onChange={(e) => setUpdatedItem({ ...updatedItem, userName: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Item Name</label>
                                <Input
                                    type="text"
                                    value={updatedItem.itemName}
                                    onChange={(e) => setUpdatedItem({ ...updatedItem, itemName: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <Input
                                    type="text"
                                    value={updatedItem.price}
                                    onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <Input
                                    type="text"
                                    value={updatedItem.description}
                                    onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end border-t pt-2">
                        <button type="button" className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleCloseModal}>Close</button>
                        <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={modalType === 'addSchedule' ? handleAddSchedule : handleUpdateItem}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}













              </div>
    );
};

export default Dashboard;
