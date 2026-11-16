import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card border-0 shadow-sm rounded-4 text-center p-5 bg-white" style={{ maxWidth: '480px', width: '100%' }}>
        <div className="mb-3 text-warning">
          <FiAlertCircle size={64} />
        </div>
        <h1 className="display-4 fw-bold text-dark mb-2">404</h1>
        <h4 className="fw-bold text-dark mb-2">Page Not Found</h4>
        <p className="text-muted mb-4 small">
          The page or resource you are looking for doesn't exist or has been moved.
        </p>
        <div>
          <Link
            to="/dashboard"
            className="btn btn-primary px-4 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
          >
            <FiHome size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
