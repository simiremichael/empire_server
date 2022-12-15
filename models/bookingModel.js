import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
    startDate: String,
  startTime: String,
  endDate: String, 
  endTime: String, 
  select:  String,
    name: {type: String, required: true},
    phone: String,
    email: {type: String, required: true},
    id: { type: String }, 
    profilePicture: String,
    apartmentNo: String,
    creator: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

