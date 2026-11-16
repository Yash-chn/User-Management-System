import express from 'express';
import {
  getUserStats,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Apply auth and admin middleware to all user management routes
router.use(protect);
router.use(adminOnly);

// Specific route for statistics before parameterized :id route
router.get('/stats', getUserStats);

// CRUD routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.patch('/:id/status', updateUserStatus);

export default router;
