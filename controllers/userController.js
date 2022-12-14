import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import mongoose from "mongoose";


export const getUsers = async (req, res) => {
  try {
      const users = await User.find();
     
      res.status(200).json(users);
  } catch (error) {
      res.status(404).json({message: error.message})
  }
}

export const getUser = async (req, res) => { 
  const { id } = req.params;

  try {
      const user= await User.findById(id);
      
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const signin = async (req, res) => {

const {email, password} = req.body;
try{
    const existingUser = await User.findOne({email})
    if(!existingUser) return res.status(404).json({ message: "Agent doesn't exist"})
   
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect ) return res.status(404).json({ message: "Invalid credentials."});
    
    const token = jwt.sign({ phone: existingUser.phone, profilePicture: existingUser.profilePicture, name: existingUser.name, apartmentNo: existingUser.apartmentNo, email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '5d' });
    const refreshToken = jwt.sign({email: existingUser.email, role: existingUser.role}, 'test', { expiresIn: '5d' });

    res.cookie('jws', refreshToken, 
    { httpOnly: true, secure: true, sameSite: 'None', 
    maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ data: existingUser, token, refreshToken });
} catch(error) {
res.status(500).json({ message: "Something went wrong."});
console.log(error);
}
}

export const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jws) return res.sendStatus(401);
    const refreshToken = cookies.jws;
   
    //                                  
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        'test',
        async (err, decoded) => {
            if (err) return res.status(403).json({message: 'forbidden'});
            const foundUser = User.findOne({email: decoded.email});
            if (!foundUser) return res.status(401).json({message: 'unauthorized'});
            
            const token= jwt.sign({ email: foundUser.email, id: foundUser._id}, 'test', { expiresIn: '7d' });
            res.json({token})
        })
    }

    export const logout = (req, res) => {
        const cookies = req.cookies;
        if (!cookies.jws) return res.status(204)
        res.clearCookie('jws', { httpOnly: true, sameSite: 'None', secure: true });
       res.json({message: 'cookie cleared'});
    }

export const signup = async (req, res) => {
    const { email, password, apartmentNo, confirmPassword, profilePicture, firstName, lastName, phone} = req.body;

    try {
        const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({ message: "User already exists"})

     if(password !== confirmPassword) return res.status(400).json({ message: "Password does not match"})

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, apartmentNo, profilePicture, name: `${firstName} ${lastName}`, phone, createdAt: new Date().toISOString()})

    res.status(200).json({ result});
    } catch (error) {
    res.status(500).json({ message: "Something went wrong."});
    }
}

export const googleSignIn = async (req, res) => {
    const { picture, email, family_name, given_name, token, googleId } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // const result = { existingUser };
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h' });
        return res.status(200).json({ result: existingUser, token });
      } else {
      const result = await User.create({
        email,
        name:`${family_name} ${given_name}`,
        googleId,
        picture
      });
      const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h' });
      res.status(200).json({ result, token });
    }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
    export const deleteUser = async (req, res) => {
      const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no event with that id');
  
      await User.findByIdAndRemove(id);
  
      res.json({message: 'Event deleted successfully'});
  
    };