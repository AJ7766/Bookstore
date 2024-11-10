import express from 'express';
import { userAuthenticate } from '../middleware/authentications/userAuthenticate';
import { createUserValidation } from '../middleware/validations/createUser';
import { addBookToUser, getUserBooksController, loginUserController, createUserController } from '../_controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', createUserValidation as any, createUserController);
userRouter.post('/login', loginUserController);
userRouter.post('/add-book', userAuthenticate as any, addBookToUser);
userRouter.get('/my-books', userAuthenticate as any, getUserBooksController);

export default userRouter;
