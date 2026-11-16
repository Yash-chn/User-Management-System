import { useAuth } from '../context/AuthContext';
import {
  FiUser,
  FiMail,
  FiShield,
  FiCheckCircle,
  FiLogOut,
  FiCalendar,
  FiLock,
  FiClock,
} from 'react-icons/fi';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-vh-100 bg-body-tertiary d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-2 px-3 px-md-4 shadow-xs">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-icon-box bg-primary text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm">
              <FiShield size={20} />
            </div>
            <div>
              <span className="fw-bold text-dark fs-5 tracking-tight">Portal</span>
              <span className="badge bg-primary-subtle text-primary rounded-pill ms-2 px-2 py-1 fs-xs">
                User
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2 bg-light rounded-pill p-1 pe-3 border">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                style={{ width: '34px', height: '34px', fontSize: '0.8rem' }}
              >
                {getInitials(user?.name)}
              </div>
              <div className="d-none d-sm-block text-start lh-1">
                <span className="small fw-semibold text-dark text-truncate d-block" style={{ maxWidth: '140px' }}>
                  {user?.name || 'User'}
                </span>
                <span className="text-muted text-xs">Member</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-medium"
            >
              <FiLogOut size={16} />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-4 py-md-5 flex-grow-1">
        {/* Welcome Card */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-3 gap-md-4">
              <div
                className="avatar-circle bg-primary-subtle text-primary border border-primary-subtle fw-bold shadow-sm flex-shrink-0"
                style={{ width: '64px', height: '64px', fontSize: '1.4rem' }}
              >
                {getInitials(user?.name)}
              </div>
              <div>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 fw-semibold small mb-2 d-inline-flex align-items-center gap-1">
                  <FiCheckCircle size={13} /> Active Account
                </span>
                <h2 className="fw-bold text-dark mb-1">
                  Welcome, {user?.name}!
                </h2>
                <p className="text-muted small mb-0">
                  Here is an overview of your profile and account settings.
                </p>
              </div>
            </div>

            <div className="d-flex flex-row flex-md-column align-items-md-end gap-2 text-muted small">
              <div className="d-flex align-items-center gap-1">
                <FiCalendar size={15} />
                <span>Joined: {formatDate(user?.createdAt)}</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <FiClock size={15} />
                <span>Session: Authenticated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Cards */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 rounded-3 bg-primary-subtle text-primary">
                    <FiUser size={18} />
                  </div>
                  <h5 className="fw-bold text-dark mb-0">Profile Information</h5>
                </div>
                <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill">
                  Details
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                      Full Name
                    </small>
                    <div className="fw-bold text-dark fs-6 mt-1">{user?.name}</div>
                  </div>
                  <div className="p-2 rounded-circle bg-white shadow-2xs text-primary">
                    <FiUser size={18} />
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                      Email Address
                    </small>
                    <div className="fw-bold text-dark fs-6 mt-1 text-break">{user?.email}</div>
                  </div>
                  <div className="p-2 rounded-circle bg-white shadow-2xs text-primary">
                    <FiMail size={18} />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                        Account Status
                      </small>
                      <div className="mt-1">
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-1">
                          <span className="status-indicator-dot bg-success" /> Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                        Account Role
                      </small>
                      <div className="mt-1">
                        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-1">
                          <FiShield size={14} /> Standard User
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                  <div className="p-2 rounded-3 bg-primary-subtle text-primary">
                    <FiLock size={18} />
                  </div>
                  <h5 className="fw-bold text-dark mb-0">Role & Access</h5>
                </div>

                <p className="text-secondary small mb-3">
                  You are logged in with <strong>Standard User</strong> permissions.
                </p>

                <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-4">
                  <li className="d-flex align-items-center gap-2">
                    <span className="badge bg-success-subtle text-success rounded-circle p-1">✓</span>
                    <span>Access personal dashboard & profile overview</span>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <span className="badge bg-success-subtle text-success rounded-circle p-1">✓</span>
                    <span>Secure JWT session authentication</span>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <span className="badge bg-secondary-subtle text-secondary rounded-circle p-1">ℹ</span>
                    <span>Admin portal and user management reserved for admins</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-light rounded-3 border">
                <small className="text-muted d-block mb-1 fw-medium" style={{ fontSize: '0.75rem' }}>
                  Need admin access?
                </small>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem' }}>
                  Reach out to your system administrator to update your account role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
        User Management System &bull; Portal
      </footer>
    </div>
  );
};

export default UserDashboard;
