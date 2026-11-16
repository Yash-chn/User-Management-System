import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiLogOut,
  FiShield,
  FiX,
  FiCheckCircle,
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <FiGrid size={18} />,
    },
    {
      to: '/users',
      label: 'All Users',
      icon: <FiUsers size={18} />,
    },
    {
      to: '/users/add',
      label: 'Add New User',
      icon: <FiUserPlus size={18} />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? 'show' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand d-flex align-items-center justify-content-between px-4 py-3 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center gap-3">
            <div className="brand-icon-box bg-primary text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm">
              <FiShield size={22} />
            </div>
            <div>
              <div className="brand-title fw-bold text-white tracking-wide">Portal</div>
              <small className="brand-subtitle text-secondary">Admin Console</small>
            </div>
          </div>
          <button
            className="btn btn-sm text-secondary d-lg-none p-1"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="sidebar-nav py-3 px-3 flex-grow-1">
          <div className="sidebar-section-label text-uppercase text-secondary fw-semibold mb-2 px-3">
            Navigation
          </div>
          <ul className="nav flex-column gap-1 list-unstyled mb-0">
            {navLinks.map((link) => (
              <li key={link.to} className="nav-item">
                <NavLink
                  to={link.to}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all ${
                      isActive ? 'active-link' : 'inactive-link'
                    }`
                  }
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="fw-medium">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Connected DB status pill & user card */}
        <div className="sidebar-footer p-3 border-top border-secondary border-opacity-25 mt-auto">
          <div className="system-pill d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-3">
            <FiCheckCircle className="text-success" size={14} />
            <span className="text-muted small fw-medium">MongoDB Connected</span>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 overflow-hidden">
              <div className="avatar-circle-sm bg-primary text-white fw-bold">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="text-truncate">
                <div className="text-white small fw-semibold text-truncate">{user?.name}</div>
                <div className="text-muted text-xs text-truncate">{user?.email}</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="btn btn-link text-danger p-1 hover-opacity"
              title="Logout"
              aria-label="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
