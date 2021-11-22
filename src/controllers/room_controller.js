const mongoose = require('mongoose');
const Room = require('../models/room')
const reservationRoom = require('../models/reservation_room')

const roomService = {
    addRoom: async function(req, res) {
        try{
        var newRoom = new Room(req.body);

        await newRoom.save();
        res.status(201).json({msg: "Create room success"});
        } catch (err){
            res.status(400).json({msg: err.msg});
        }
    },
    getAllRoom: async function(req, res){
        try{
            
            const roomDB = await Room.find().populate({path: "booked", model: 'ReservationRoom', populate: {path: 'staffId', model: 'User'}}).exec();
            console.log(roomDB)
            return res.status(200).json(roomDB);
        } catch (e){
            res.status(403).send({ success: false, msg: e.toString() });
            console.log(e)
        }
    },
    
    
}

 const bookingService = {
    insertBooking: async function(req, res){
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Room with id: ${id}`});
        }
        try{
            const room = await Room.findById(id);
            const reservation = new reservationRoom(req.body);
            console.log(reservation);
            await reservation.save();
            room.booked.push(reservation);
            await room.save();
            res.status(201).json({msg: "Update Room success"});
        } catch (err){
            res.status(409).json({ msg: err.message });
        }
    },
    deleteBooking: async function(req, res){
        const {id} = req.params;
        const {reservationId} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Room with id: ${id} `});
            
        }
        if(!mongoose.Types.ObjectId.isValid(reservationId)){
            return res.status(404).json({msg: `No Booking with id: ${reservationId} `});
        }
        try{
            const room = await Room.findById(id);
            await room.booked.pull(reservationId);
            try{
                const reservation = await reservationRoom.findByIdAndRemove(reservationId);
                await reservation.save();
            } catch (e){
                console.log(e.message);
            }
            await room.save();
            res.status(404).json({msg: "Delete booking success"});
        } catch(err){
            res.status(409).json({msg: err.message});
        }
    }
}

module.exports = {roomService, bookingService}