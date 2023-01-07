import mongoose from "mongoose";
import express from 'express';
import Booking from "../models/bookingModel.js";
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
       
        res.status(200).json(bookings);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const getBookingBySearch = async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  const search = new RegExp(req.params?.search, 'i');
  //const search  = req.params;

  //if(req.params.location) {
   if(search !== '') {
    try {
        // const data = await Property.find({location: { $regex: req.params.location, $options: 'i'}});
        const data = await Booking.find({location: search, });
        res.status(200).json({data});
    } catch (error) {
        res.status(404).json({ message: 'Property not found'})
    } 
}else {
    res.status(404).json({ message: 'queryLocation not found'})
   }
}

export const getBooking = async (req, res) => { 
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        
        res.status(200).json(booking);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
             
export const getBookingByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Agent doesn't exist" });
    }
    const userBookings = await Booking.find({ creator: id });
    res.status(200).json(userBookings);
  };



export const createBooking = async (req, res) => {

    const { startDate, startTime, endDate, endTime, select, creator, name, phone, email, id, profilePicture, apartmentNo } = req.body;
    //  const property = req.body;
    try {
        const existingBookings = await Booking.find({startDate})
    //  if(existingBookings) return res.status(404).json({ message: "data and time unavailable"});
     
    const newBooking = new Booking({ creator: req.userId, startDate, startTime, endDate, endTime, select, name: req.name, phone: req.phone, email: req.email, id, profilePicture: req.profilePicture, apartmentNo: req.apartmentNo, createdAt: new Date().toLocaleDateString('en-GB', { hour12: false })})

        await newBooking.save();
        res.status(201).json(newBooking);
        
        const send_to =  'ademola.azeez@tfcameroncourt.com';
        const send_from = process.env.USER_EMAIL;
        const subject = 'booked succesfully';
        const message = `
         <h3>Empire Court Lifestyle Booking System.</h3>
                           <p>${req.apartmentNo} has successfully booked ${select} between ${startTime} ${startDate} and ${endTime} ${endDate}</p>
        `
        await sendEmail(subject, message, send_to, send_from);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBooking = async (req, res) => {
    const { id } = req.params;

    const { startDate, startTime, endDate, endTime, select, creator, name, phone, email, profilePicture, apartmentNo  } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedBooking = {   creator: req.userId, startDate, startTime, endDate, endTime, select, name: req.name, phone: req.phone, email: req.email, id, profilePicture: req.profilePicture, apartmentNo: req.apartmentNo, createdAt: new Date().toLocaleString()};

    await Property.findByIdAndUpdate(id, updatedBooking, { new: true });                    

    res.json(updatedBooking);
 }

 export const deleteBooking = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no event with that id');

    await Booking.findByIdAndRemove(id);

    res.json({message: 'Event deleted successfully'});

  }

export  default router;
