const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const ItemModel = require("../model/itemModel");


//Add item//


router.post('/add-items', async (req, res) => {
    try {
        const { userName, itemName, price, description } = req.body;
        

        const newItem = new ItemModel({
            userName,
            itemName,
            price,
            description,
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        return res.status(500).send("Internal server error");

    }
});



//get all items//

router.get('/get-items', async (req, res) => {
    try {
        const items = await ItemModel.find().populate('user');
        res.status(200).json(items);
    } catch (error) {
        return res.status(500).send("Internal server error");

    }
});





// Update an item
router.put('/Updateitem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userName,itemName, price, description } = req.body;

        const updatedItem = await ItemModel.findByIdAndUpdate(
            id,
            { userName,itemName, price, description },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        return res.status(500).send("Internal server error");

    }
});



// Add a schedule to an item
router.post('/:id/schedule', async (req, res) => {
    try {
        const { id } = req.params;
        const { frequency, quantity, startDate, endDate } = req.body;

        console.log(`Adding schedule to item with ID: ${id}`);
        // console.log(`Schedule Details:`, { frequency, quantity, startDate, endDate });

        const item = await ItemModel.findById(id);
        if (!item) {
            console.log(`Item with ID: ${id} not found`);
            return res.status(404).json({ message: 'Item not found' });
        }

        const newSchedule = { frequency, quantity, startDate, endDate };
        item.schedules.push(newSchedule);

        await item.save();
        res.status(201).json(item);
    } catch (error) {
        console.error('Error adding schedule:', error);
        return res.status(500).send("Internal server error");
    }
});



// Delete a schedule
router.delete('/:id/schedule/:scheduleId/delete', async (req, res) => {
    try {
        const { id, scheduleId } = req.params;

        console.log(`Deleting schedule with ID: ${scheduleId} from item with ID: ${id}`);

        const item = await ItemModel.findById(id);
        if (!item) {
            console.log(`Item with ID: ${id} not found`);
            return res.status(404).json({ message: 'Item not found' });
        }

        // Ensure scheduleId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
            console.log(`Invalid schedule ID: ${scheduleId}`);
            return res.status(400).json({ message: 'Invalid schedule ID' });
        }

        // Find the schedule by its ObjectId and remove it from the array
        const scheduleIndex = item.schedules.findIndex(s => s._id.toString() === scheduleId);
        if (scheduleIndex === -1) {
            console.log(`Schedule with ID: ${scheduleId} not found`);
            return res.status(404).json({ message: 'Schedule not found' });
        }

        item.schedules.splice(scheduleIndex, 1);
        await item.save();

        // Send an empty JSON object with 204 status
        res.status(204).json({});
    } catch (error) {
        console.error('Error deleting schedule:', error);
        return res.status(500).send("Internal server error");
    }
});


// Delete an item
router.delete('/Deleteitem/:id', async (req, res) => {
    try {
        

        let item = await ItemModel.findById(req.params.id);

        if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            item = await ItemModel.findByIdAndDelete(req.params.id)
        res.json({ 'Success': "item has been deleted" });

    } catch (error) {
        return res.status(500).send("Internal server error");

    }
});







module.exports = router