import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


const authUser = async (req, res) =>{
    const { email,password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          
        });
      
    }
    else{
            res.status(401).json('invalid email or password');
          
    } 
    

}


const registerUser = async (req, res) =>{

    const {name,email, password} = req.body;

    const userExits = await User.findOne({email});
    if(userExits){
        res.status(400).json({message: 'user already exists'});
    }
  else{
    const user= await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          
        });
    }
    else{
        res.status(400).json({message: 'invalid user data'})
    }
}
    
}

const logoutUser = async (req, res) =>{

  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({message: 'logged out successfully '});
    
}


const getUserProfile = async (req, res) =>{

 const user = await User.findById(req.user._id);

 if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      
    });
 }
 else{
    res.status(404).json('user not found');
 }
    
}


const updateUserProfile = async (req, res) =>{

  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
        user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
        _id: updateUser._id,
        name: updatedUser.name,
        email: updateUser.email,
        isAdmin: updatedUser.isAdmin,
    })
  }
  else{
    res.status(400).json('user not found');
  }
    
}


const getUsers = async (req, res) =>{

   const users = await User.find({});
   res.status(200).json(users);
    
}

const getUserById = async (req, res) =>{

  const user = await User.findById(req.params.id).select('-password');
  if(user){
    res.status(200).json(user);
  }
  else{
    res.status(400).json('User not found');
  }
    
}


const deleteUser = async (req, res) =>{

   const user = await User.findById(req.params.id);
   if(user){
    if(user.isAdmin){
        res.status(400).json('Cannot delete admin user');
    }
    await User.deleteOne({_id: user._id});
    res.status(200).json({message: 'User deleted successfully'});
   }
   else{
    res.status(400).json('User not found');
   }
    
} 


const updateUser = async (req, res) =>{

  const user = await User.findById(req.params.id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin, 
    });
  }
  else{
    console.error(error);
    res.status(400).json('User not found');
  } 
     
} 

export {

    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser 
}