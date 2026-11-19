import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      if (data.success) {
        const defaultPath = data.user?.role === 'admin' ? '/dashboard' : '/user-dashboard';
        const requestedPath = location.state?.from?.pathname;
        const target = requestedPath && requestedPath !== '/dashboard' && requestedPath !== '/'
          ? requestedPath
          : defaultPath;

        navigate(target, { replace: true });
      }
    } catch (err) {
      if (!err.response) {
        setError('Cannot reach server. Please ensure the backend server is running on http://localhost:5000.');
      } else {
        setError(
          err.response?.data?.message || 'Login failed. Please check your credentials.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="auth-wrapper min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4">
      <div className="auth-card card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '440px', width: '100%' }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-4 p-3 mb-3 shadow-sm">
              <FiShield size={28} />
            </div>
            <h3 className="fw-bold text-dark tracking-tight mb-1">Welcome Back</h3>
            <p className="text-muted small">Sign in to your account</p>
          </div>

          {/* Quick fill buttons */}
          <div className="p-3 bg-light rounded-3 border mb-4">
            <small className="text-muted d-block fw-semibold mb-2" style={{ fontSize: '0.72rem' }}>
              DEMO ACCOUNTS
            </small>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1 fw-medium fs-xs"
                onClick={() => fillCredentials('admin@example.com', 'Admin@123')}
              >
                Admin
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 fw-medium fs-xs"
                onClick={() => fillCredentials('sarah.connor@cyberdyne.io', 'Password@123')}
              >
                User
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 py-2 px-3 small mb-4" role="alert">
              <FiAlertCircle size={18} className="flex-shrink-0" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
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
                  className="form-control border-start-0 ps-1"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted">
                  <FiLock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control border-start-0 border-end-0 ps-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-group-text bg-white border-start-0 text-muted cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/register" className="fw-semibold text-primary text-decoration-none small">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
