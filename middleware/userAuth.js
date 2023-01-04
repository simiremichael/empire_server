import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const userAuth = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
   
      
    jwt.verify(
        token,
        'test',
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.userId = decoded?.id;
            req.name = decoded?.name;
            req.email = decoded?.email;
            req.apartmentNo = decoded?.apartmentNo;
            req.phone = decoded?.phone;
            req.profilePicture = decoded?.profilePicture;
            next()
        })


    // try {
    //     const token = req.headers.authorization.split(" ")[1];
    //     // const isCustomAuth = token.length < 500;

    //     let decodedData;

    //     if(token ) {
    //         decodedData = jwt.verify(token, 'test');
    //         req.userId = decodedData?.id;
    //         req.name = decodedData?.name;
    //         req.email = decodedData?.email;
    //         req.apartmentNo = decodedData?.apartmentNo;
    //         req.phone = decodedData?.phone;
    //     } else {
    //          decodedData = jwt.decode(token);
    //         req.agentId = decodedData?.sub;
    //         const googleId = decodedData?.sub.toString();
    //   const user = await User.findOne({ googleId });
    //   req.userId = user?._id;
    //     }
    //     next();

    // } catch (error) {
    //     console.log(error);
    // }
}

export default userAuth;