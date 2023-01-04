import express from 'express';

import { signin, signup, googleSignIn, refresh, logout, getUsers, deleteUser, getUser } from '../controllers/userController.js';

const userRoute = express.Router()

userRoute.post('/signin', signin);
userRoute.post('/signup', signup);
userRoute.post("/googleSignIn", googleSignIn);
userRoute.post('/refresh', refresh)
userRoute.post('/logout', logout)
userRoute.get('/', getUsers)
userRoute.get('/', getUser)
userRoute.delete('/:id', deleteUser)

export default userRoute;