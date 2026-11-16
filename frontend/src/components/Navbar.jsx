import { useAuth } from '../context/AuthContext';
import { FiMenu, FiLogOut, FiUser, FiShield } from 'react-icons/fi';

const Navbar = ({ onToggleSidebar, pageTitle = 'Dashboard' }) => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-2 px-3 px-md-4 shadow-xs">
      <div className="container-fluid d-flex align-items-center justify-content-between px-0">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light d-lg-none p-2 border rounded-3"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <FiMenu size={20} className="text-secondary" />
          </button>
          <div>
            <h1 className="h5 mb-0 fw-bold text-dark">{pageTitle}</h1>
            <small className="text-muted d-none d-sm-inline">Admin Portal</small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* User profile capsule */}
          <div className="d-flex align-items-center gap-2 p-1 pe-3 bg-light rounded-pill border">
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ width: '36px', height: '36px', fontSize: '0.85rem' }}
            >
              {getInitials(user?.name)}
            </div>
            <div className="d-none d-md-block text-start lh-1">
              <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '140px', fontSize: '0.875rem' }}>
                {user?.name || 'Administrator'}
              </div>
              <small className="text-primary fw-medium" style={{ fontSize: '0.75rem' }}>
                <FiShield className="me-1" size={11} />
                {user?.role?.toUpperCase()}
              </small>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={logout}
            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-medium"
            title="Log Out"
          >
            <FiLogOut size={16} />
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
