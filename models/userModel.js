import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    phone: String,
    email:  String, 
    password: String,
    id: String, 
    profilePicture: String,
    apartmentNo: String,
    token: String,
    refreshToken: [String],
    googleId: String
});

const User = mongoose.model('User', userSchema);

export default User;