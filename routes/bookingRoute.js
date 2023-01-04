import express from 'express';
import { getBookings, createBooking, updateBooking, deleteBooking, getBooking, getBookingByUser} from '../controllers/bookingController.js';

import userAuth from '../middleware/userAuth.js';

//agentAuth,
const bookingRoute = express.Router()

// propertyRoute.get('/search/:search', getPropertyBySearch);
bookingRoute.get('/', getBookings);
bookingRoute.post('/', userAuth, createBooking);
bookingRoute.get('/:id', getBooking );
bookingRoute.patch('/:id', userAuth, updateBooking);
bookingRoute.delete('/:id',  deleteBooking);
bookingRoute.get('/userBookings/:id', userAuth, getBookingByUser);
// propertyRoute.get('/companyProperties/:id', companyPropertySearch);
// propertyRoute.get('/searches/:id', companyPropertySearch);
export default bookingRoute; 