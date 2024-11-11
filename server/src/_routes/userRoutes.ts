import express from 'express';
import { userAuthenticate } from '../middleware/authentications/userAuthenticate';
import { createUserValidation } from '../middleware/validations/createUser';
import { addBookToUserController, getUserBooksController, loginUserController, createUserController, checkUserAuthController } from '../_controllers/userController';

const userRouter = express.Router();

userRouter.get('/get-cookie', checkUserAuthController as any);
userRouter.post('/register', createUserValidation as any, createUserController);
userRouter.post('/login', loginUserController);
userRouter.post('/add-book', userAuthenticate as any, addBookToUserController);
userRouter.get('/my-books', userAuthenticate as any, getUserBooksController);

export default userRouter;
