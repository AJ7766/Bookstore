import express from 'express';
import { adminAuthenticate } from '../middleware/authentications/adminAuthenticate';
import { addBook, loginAdmin, registerAdmin } from '../_controllers/adminController';
import { adminRegistrationvalidation } from '../middleware/validations/adminRegistrationValidation';
import { getUserListService } from '../_services/adminServices';
import { getBookService, updateBookService } from '../_services/bookServices';

const adminRouter = express.Router();

adminRouter.post("/", loginAdmin);
adminRouter.post("/register", adminRegistrationvalidation as any, registerAdmin);
adminRouter.use(adminAuthenticate as any);
adminRouter.get('/users', getUserListService as any);
adminRouter.get('/books', getBookService as any);
adminRouter.post('/add-book', addBook);
adminRouter.put('/update-book', updateBookService as any);

export default adminRouter;