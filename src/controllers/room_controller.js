const mongoose = require('mongoose');
const Room = require('../models/room')
const reservationRoom = require('../models/reservation_room');
const room = require('../models/room');

const roomService = {
    addRoom: async function(req, res) {
        try{
        var newRoom = new Room(req.body);

        await newRoom.save();
        res.status(201).json({msg: "Create room success"});
        } catch (err){
            res.status(400).json({msg: err.message});
        }
    },
    getAllRoom: async function(req, res){
        try{
            
            const roomDB = await Room.find().populate({path: "bookings", model: 'ReservationRoom', populate: {path: 'staffId', model: 'User'}});
            console.log(roomDB)
            return res.status(200).json(roomDB);
        } catch (e){
            res.status(403).send({ success: false, msg: e.toString() });
            console.log(e)
        }
    },
    getRoomDetail: async function(req, res){
        const {id} = req.params;
        try{
            const roomDB = await Room.findById(id).populate({path: "bookings", model: 'ReservationRoom', populate: [{path: 'staffId', model: 'User'}]});
            console.log(roomDB.bookings.length);
            for(let i =0; i < roomDB.bookings.length; i++){
                roomDB.bookings[i]=roomDB.bookings[i].toObject();
                roomDB.bookings[i].roomName = roomDB.roomName;
                console.log(roomDB.bookings[i]);
            }
            return res.status(200).json(roomDB);
        } catch (err) {
            res.status(404).json({msg: err.message});
        }
    }
    
}

 const bookingService = {
    getReservationDetail: async function(req, res){
        const {id} = req.params;
        try{
            const reservationDB = await reservationRoom.findById(id).populate("room");
            return res.status(200).json(reservationDB);
        } catch (err) {
            res.status(404).json({msg: err.message});
        }
    },
    insertBooking: async function(req, res){
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Room with id: ${id}`});
        }
        try{
            const reservation = new reservationRoom({room: id,...req.body});
            console.log(reservation);
            await reservation.save();
            res.status(201).json({msg: "Update Room success"});
        } catch (err){
            res.status(409).json({ msg: err.message });
        }
    },
    updatePaidStatus: async function(req, res){
        const {id} = req.params;
        const {paidStatus} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Reservation with id: ${id}`});
           
        }
        try{
            await reservationRoom.findByIdAndUpdate(id, {$set: {paidStatus},});
            res.status(201).json({msg: "Update request success"});
        } catch (err){
            res.status(409).json({msg: err.message});
        }
    },
    deleteBooking: async function(req, res){
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Booking with id: ${id} `});
        }
        try{
            const reservation = await reservationRoom.findByIdAndRemove(id);
            await reservation.save();
            res.status(201).json({msg: "Delete booking success"});
        } catch(err){
            res.status(409).json({msg: err.message});
        }
    }
}

module.exports = {roomService, bookingService}