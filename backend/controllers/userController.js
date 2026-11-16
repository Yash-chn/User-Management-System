import User from '../models/User.js';

export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const inactiveUsers = await User.countDocuments({ status: 'inactive' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalAdmins,
        recentUsers,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics.',
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { search, role, status } = req.query;
    const filter = {};

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: regex }, { email: regex }];
    }

    if (role && role !== 'all') {
      filter.role = role;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve users.',
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user details.',
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters long.',
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role && ['user', 'admin'].includes(role) ? role : 'user',
      status: status && ['active', 'inactive'].includes(status) ? status : 'active',
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create user.',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role, status, password } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Prevent admin from removing their own admin status or deactivating self
    if (req.user._id.toString() === userId) {
      if (role && role !== 'admin') {
        return res.status(400).json({
          success: false,
          message: 'You cannot remove admin privileges from your own account.',
        });
      }
      if (status && status !== 'active') {
        return res.status(400).json({
          success: false,
          message: 'You cannot deactivate your own account.',
        });
      }
    }

    if (email && email.toLowerCase().trim() !== user.email) {
      const normalizedEmail = email.toLowerCase().trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }

      const duplicate = await User.findOne({ email: normalizedEmail });
      if (duplicate && duplicate._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          message: 'Email address already in use by another account.',
        });
      }
      user.email = normalizedEmail;
    }

    if (name) {
      if (name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Name must be at least 2 characters long.',
        });
      }
      user.name = name.trim();
    }

    if (role && ['user', 'admin'].includes(role)) {
      user.role = role;
    }

    if (status && ['active', 'inactive'].includes(status)) {
      user.status = status;
    }

    if (password && password.trim() !== '') {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long.',
        });
      }
      user.password = password;
    }

    const updated = await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      user: {
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        status: updated.status,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user.',
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account.',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: `User ${user.name} was removed.`,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete user.',
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const nextStatus = status || (user.status === 'active' ? 'inactive' : 'active');

    if (!['active', 'inactive'].includes(nextStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be active or inactive.',
      });
    }

    if (req.user._id.toString() === userId && nextStatus === 'inactive') {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account.',
      });
    }

    user.status = nextStatus;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User status changed to ${nextStatus}.`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Error toggling status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update user status.',
    });
  }
};
