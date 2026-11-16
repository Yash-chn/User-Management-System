import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
  FiUserPlus,
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
} from 'react-icons/fi';

const AddUser = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, password, role, status } = formData;

    if (!name || !email || !password) {
      setError('Name, email, and password are required.');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      const res = await userService.createUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role,
        status,
      });

      if (res.success) {
        setSuccess(`User "${res.user.name}" created successfully. Redirecting...`);
        setTimeout(() => {
          navigate('/users');
        }, 1000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create user. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout d-flex min-vh-100 bg-body-tertiary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main-wrapper flex-grow-1 d-flex flex-column">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          pageTitle="Add User"
        />

        <main className="content-container p-3 p-md-4 p-xl-5 flex-grow-1">
          <div className="mb-4">
            <Link
              to="/users"
              className="btn btn-link text-decoration-none text-muted ps-0 d-inline-flex align-items-center gap-2 mb-2"
            >
              <FiArrowLeft size={16} />
              <span>Back to Users</span>
            </Link>
            <h2 className="fw-bold text-dark mb-1">Create New User</h2>
            <p className="text-muted small mb-0">Add a new user or administrator account.</p>
          </div>

          <div className="row">
            <div className="col-12 col-lg-8 col-xl-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                {success && (
                  <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 py-2 px-3 small mb-4" role="alert">
                    <FiCheckCircle size={18} className="flex-shrink-0" />
                    <div>{success}</div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 py-2 px-3 small mb-4" role="alert">
                    <FiAlertCircle size={18} className="flex-shrink-0" />
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Full Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <FiUser size={16} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        className="form-control border-start-0 ps-1"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <FiMail size={16} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-start-0 ps-1"
                        placeholder="alex.morgan@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-secondary">
                      Temporary Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <FiLock size={16} />
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control border-start-0 ps-1"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                        <FiShield size={14} /> Role
                      </label>
                      <select
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="user">Standard User</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-semibold text-secondary d-flex align-items-center gap-1">
                        <FiCheckCircle size={14} /> Status
                      </label>
                      <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-end gap-2 pt-3 border-top">
                    <Link
                      to="/users"
                      className="btn btn-light px-4 py-2 rounded-3 border fw-medium"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Saving...</span>
                      ) : (
                        <>
                          <FiUserPlus size={16} />
                          <span>Create User</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-4 col-xl-5 mt-4 mt-lg-0">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3">Guidelines</h5>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0 small text-secondary">
                  <li className="d-flex align-items-start gap-2">
                    <span className="badge bg-primary-subtle text-primary rounded-circle p-1 mt-1">✓</span>
                    <span><strong>Email:</strong> Must be unique and not currently registered.</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <span className="badge bg-primary-subtle text-primary rounded-circle p-1 mt-1">✓</span>
                    <span><strong>Roles:</strong> Administrators have full access to manage users and view stats. Standard users have access only to their own profile.</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <span className="badge bg-primary-subtle text-primary rounded-circle p-1 mt-1">✓</span>
                    <span><strong>Status:</strong> Inactive accounts cannot sign in until reactivated.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUser;
