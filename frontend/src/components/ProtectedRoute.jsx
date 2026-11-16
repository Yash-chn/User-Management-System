import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiAlertTriangle } from 'react-icons/fi';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-semibold">Authenticating session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login preserving destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 text-center p-4 p-md-5">
              <div className="mb-3 text-warning">
                <FiAlertTriangle size={56} />
              </div>
              <h3 className="fw-bold text-dark mb-2">Access Denied</h3>
              <p className="text-muted mb-4">
                You are logged in as a standard user. This section requires Administrator privileges to access.
              </p>
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                <Link to="/user-dashboard" className="btn btn-primary px-4 py-2 rounded-3">
                  Go to User Dashboard
                </Link>
                <a href="/login" className="btn btn-outline-secondary px-4 py-2 rounded-3">
                  Switch Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
