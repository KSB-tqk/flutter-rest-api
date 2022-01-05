const mongoose = require('mongoose');
const Room = require('../models/room')
const reservationRoom = require('../models/reservation_room');
const moment = require('moment')

const roomService = {
    addRoom: async function (req, res) {
        try {
            var newRoom = new Room(req.body);

            await newRoom.save();
            res.status(201).json({ msg: "Create room success" });
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    },
    getAllRoom: async function (req, res) {
        try {

            const roomDB = await Room.find().exec();
            return res.status(200).json(roomDB);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() });
            console.log(e)
        }
    },
    updateRoom: async function (req, res) {
        const { id } = req.params;
        const { roomPrice } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `No Room with id: ${id}` });
        }
        try {
            await Room.findByIdAndUpdate(id, {
                $set: {
                    roomPrice: roomPrice
                },
            });
            res.status(200).json({ message: `Update Room success!` });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    },
    findRoom: async function(req, res){
        const rooms = await Room.find().exec();
        const reservationDB = await reservationRoom.find().exec();
        const{checkIn, checkOut} = req.query;
        let timeCheckIn = moment(checkIn).startOf("day").toDate();
        let timeCheckOut =  moment(checkOut).endOf("day").toDate();
        // console.log(checkIn);
        // console.log(checkOut);
        // console.log(timeCheckIn);
        // console.log(timeCheckOut);
        let roomEmpty = rooms.filter(room => {
            let checkRoom = true;
            reservationDB.map(reservation => {
                if(JSON.stringify(room._id) === JSON.stringify(reservation.room)) {
                    if (timeCheckIn >= reservation.checkIn && timeCheckIn <= reservation.checkOut || 
                        timeCheckOut >= reservation.checkIn && timeCheckOut <= reservation.checkOut || 
                        timeCheckIn <= reservation.checkIn && timeCheckOut >= reservation.checkOut ) {
                        checkRoom = false
                    }
                }
            })
            if(checkRoom) {
                return room
            }
        })
        console.log(roomEmpty.length);
        res.status(200).json(roomEmpty);
    }

}

const bookingService = {
    getReservationByRoomId: async function (req, res) {
        const { id } = req.params;
        try {
            const roomDB = await reservationRoom.find({ room: id }).populate([{ path: 'staffId', model: 'User' }, { path: 'room', model: 'Room' }]);
            return res.status(200).json(roomDB);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() });
        }
    },
    getAllReservation: async function (req, res) {
        try {
            const reservationDB = await reservationRoom.find().populate([{ path: 'staffId', model: 'User' }, { path: 'room', model: 'Room' }]);
            return res.status(200).json(reservationDB);
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    },
    getReservationDetail: async function (req, res) {
        const { id } = req.params;
        try {
            const reservationDB = await reservationRoom.findById(id).populate("room");
            return res.status(200).json(reservationDB);
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    },
    insertBooking: async function (req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `No Room with id: ${id}` });
        }
        try {
            const newBooking = new reservationRoom({ room: id, ...req.body });
            console.log(newBooking);
            await newBooking.save();
            res.status(201).json({ msg: "Update Room success" });
        } catch (err) {
            res.status(409).json({ msg: err.message });
        }
    },
    updatePaidStatus: async function (req, res) {
        const { id } = req.params;
        const { paidStatus, dateCreate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `No Reservation with id: ${id}` });

        }
        try {
            await reservationRoom.findByIdAndUpdate(
                id,
                {
                    $set: { paidStatus: paidStatus, dateCreate: dateCreate },
                }
            );
            res.status(201).json({ msg: "Update request success" });
        } catch (err) {
            res.status(409).json({ msg: err.message });
        }
    },
    deleteBooking: async function (req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `No Booking with id: ${id} ` });
        }
        try {
            const reservation = await reservationRoom.findByIdAndRemove(id);
            res.status(201).json({ msg: "Delete booking success" });
        } catch (err) {
            res.status(409).json({ msg: err.message });
        }
    },
    get_paid_room_bill_today: async function (req, res) {
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        nextDay.setDate(day.getDate() + 1);
        console.log(nextDay);
        try {
            const reservationDB = await reservationRoom.find({
                paidStatus: 1,
                dateCreate: {
                    $gte: day,
                    $lt: nextDay
                },
            }).populate([{ path: 'staffId', model: 'User' }, { path: 'room', model: 'Room' }]);
            res.status(200).json(reservationDB);
        } catch (e) {
            console.log(e);
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },
    get_all_paid_room_bill: async function (req, res) {
        try {
            const reservationDB = await reservationRoom.find({
                paidStatus: 1,
            }).populate([{ path: 'staffId', model: 'User' }, { path: 'room', model: 'Room' }]);
            res.status(200).json(reservationDB);
        } catch (e) {
            console.log(e);
            res.status(403).send({ success: false, msg: e.toString() })
        }
    }
}

module.exports = { roomService, bookingService }