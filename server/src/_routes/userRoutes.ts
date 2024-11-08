import express from 'express';
import { userAuthenticate } from '../middleware/authentications/userAuthenticate';
import { userRegistrationvalidation } from '../middleware/validations/userRegistrationValidation';
import { addBookToUser, getAllUserBooks, loginUser, registerUser } from '../_controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', userRegistrationvalidation as any, registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/my-books', userAuthenticate as any, getAllUserBooks);
userRouter.post('/add-book', userAuthenticate as any, addBookToUser);

export default userRouter;
