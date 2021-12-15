const Entertainment = require('../models/entertaiment');
const EntertainmentBill = require('../models/entertainment_bill');
const TypeTicketEntertainment = require('../models/type_ticket_entertainment');
const mongoose = require('mongoose');

const entertainmentService = {
    add_entertainment: async function (req, res){
            try{
                var newEntertainment = new Entertainment(req.body);
        
                await newEntertainment.save();
                res.status(201).json({msg: "Create Entertainment success"});
                } catch (err){
                    res.status(400).json({msg: err.message});
                }
    },
    update_entertainment: async function(req, res){
        const{id} = req.params;
        const{entertainName, entertainPrice} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No entertainment with id: ${id}`});
        }
        try{
            await Entertainment.findByIdAndUpdate(id, {$set: {entertainName: entertainName, entertainPrice: entertainPrice}});
            res.status(200).json({message: 'Update Entertainment sucess'});
        } catch (err){
            return res.status(409).json({message: err.message});
        }
    },
    delete_entertainment: async function(req, res){
        const{id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No entertainment with id: ${id}`});
        }
        try{
            await Entertainment.findByIdAndRemove(id);
            res.status(200).json({message: 'Remove Entertainment success'});
        } catch (e){
            return res.status(409).json({message: err.message});
        }
    },
    get_all_entertainment: async function(req, res){
       
        try{
            const entertainmentDB = await Entertainment.find().populate("typeTicket").lean().exec();
            return res.status(200).json(entertainmentDB);
        } catch (e){
            return res.status(409).json({message: err.message});
        }
    }
};

const entertainmentBill = {
    add_entertainment_bill: async function(req, res){
        try{
            var newBill = EntertainmentBill(req.body);
            await newBill.save();
            res.status(200).json({message: 'Add entertainment bill success!'});
        } catch (err){
            return res.status(400).json({message: err.message});
        }
    },
    get_all_bill: async function(req, res){
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        nextDay.setDate(day.getDate() + 1);
        try{
            const bills = await EntertainmentBill.find({
                dateCreate: {
                    $gte: day, 
                    $lt: nextDay,
                  },
            }).populate("staff").exec();
            return res.status(200).json(bills);
        } catch (err){
            res.status(403).send({ success: false, message: err.message });
        }
    },
    get_bills_of_the_day: async function(req, res){
        try{
            const bills = await EntertainmentBill.find({
                dateCreate: {
                    $gte: new Date(req.query.year, req.query.month-1, req.query.day), 
                    $lt: new Date(req.query.year, req.query.month-1, req.query.day+1)
                }
            });
            return res.status(200).json(bills);
        } catch (err) {
            res.status(403).send({message: err.message});
        }
    }
}

const typeTicketController = {
    add_type_ticket: async function(req, res){
        try{
            var newType = TypeTicketEntertainment(req.body);
            await newType.save();
            res.status(200).json({message: 'Add type ticket success!'});
        } catch (err){
            return res.status(400).json({message: err.message});
        }
    }
}

module.exports = {entertainmentService, entertainmentBill, typeTicketController}