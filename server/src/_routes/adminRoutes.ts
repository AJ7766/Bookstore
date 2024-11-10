import express from 'express';
import { adminAuthenticate } from '../middleware/authentications/adminAuthenticate';
import { loginAdminController, createAdminController, getUsersController } from '../_controllers/adminController';
import { createAdminValidation } from '../middleware/validations/createAdmin';
import { createBookController, getBooksController, updateBookController } from '../_controllers/bookController';

const adminRouter = express.Router();

adminRouter.post("/", loginAdminController);
adminRouter.post("/register", createAdminValidation as any, createAdminController);
adminRouter.use(adminAuthenticate as any);
adminRouter.post('/create-book', createBookController);
adminRouter.put('/update-book/:_id', updateBookController);
adminRouter.get('/users', getUsersController);
adminRouter.get('/books', getBooksController);

export default adminRouter;