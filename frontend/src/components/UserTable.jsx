import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiShield, FiUser } from 'react-icons/fi';

const UserTable = ({
  users = [],
  currentUserId,
  onEdit,
  onDelete,
  onToggleStatus,
  actionLoadingId = null,
}) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded-4 border p-4">
        <div className="text-muted mb-3">
          <FiUser size={48} className="opacity-50" />
        </div>
        <h5 className="fw-bold text-dark mb-1">No users found</h5>
        <p className="text-muted small mb-0">
          Try adjusting your search criteria or filter options to find what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive bg-white rounded-4 shadow-sm border overflow-hidden">
      <table className="table table-hover align-middle mb-0 custom-user-table">
        <thead className="table-light border-bottom text-uppercase fs-xs text-muted fw-bold">
          <tr>
            <th scope="col" className="ps-4 py-3">User</th>
            <th scope="col" className="py-3">Role</th>
            <th scope="col" className="py-3">Status</th>
            <th scope="col" className="py-3">Joined Date</th>
            <th scope="col" className="text-end pe-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = currentUserId === user._id;
            const isRowLoading = actionLoadingId === user._id;

            return (
              <tr key={user._id} className={user.status === 'inactive' ? 'opacity-75 bg-light-subtle' : ''}>
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className={`avatar-circle fw-bold ${
                        user.role === 'admin'
                          ? 'bg-purple-subtle text-purple border border-purple-subtle'
                          : 'bg-primary-subtle text-primary border border-primary-subtle'
                      }`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark">{user.name}</span>
                        {isSelf && (
                          <span className="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-0 fs-xs">
                            You
                          </span>
                        )}
                      </div>
                      <small className="text-muted d-block text-truncate" style={{ maxWidth: '240px' }}>
                        {user.email}
                      </small>
                    </div>
                  </div>
                </td>

                <td className="py-3">
                  {user.role === 'admin' ? (
                    <span className="badge bg-purple-subtle text-purple px-2 py-1 rounded-pill fw-semibold d-inline-flex align-items-center gap-1">
                      <FiShield size={12} /> Admin
                    </span>
                  ) : (
                    <span className="badge bg-primary-subtle text-primary px-2 py-1 rounded-pill fw-semibold d-inline-flex align-items-center gap-1">
                      <FiUser size={12} /> Standard User
                    </span>
                  )}
                </td>

                <td className="py-3">
                  {user.status === 'active' ? (
                    <span className="badge bg-success-subtle text-success px-3 py-1 rounded-pill fw-semibold d-inline-flex align-items-center gap-1">
                      <span className="status-indicator-dot bg-success" /> Active
                    </span>
                  ) : (
                    <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill fw-semibold d-inline-flex align-items-center gap-1">
                      <span className="status-indicator-dot bg-danger" /> Inactive
                    </span>
                  )}
                </td>

                <td className="py-3 text-secondary small">
                  {formatDate(user.createdAt)}
                </td>

                <td className="text-end pe-4 py-3">
                  <div className="d-inline-flex align-items-center gap-1">
                    {/* Status Toggle Button */}
                    <button
                      type="button"
                      className={`btn btn-sm btn-icon rounded-3 ${
                        user.status === 'active'
                          ? 'text-warning hover-bg-warning-subtle'
                          : 'text-success hover-bg-success-subtle'
                      }`}
                      title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
                      onClick={() => onToggleStatus && onToggleStatus(user)}
                      disabled={isRowLoading || (isSelf && user.status === 'active')}
                    >
                      {user.status === 'active' ? (
                        <FiToggleRight size={20} />
                      ) : (
                        <FiToggleLeft size={20} />
                      )}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      className="btn btn-sm btn-icon text-primary hover-bg-primary-subtle rounded-3"
                      title="Edit User"
                      onClick={() => onEdit && onEdit(user)}
                      disabled={isRowLoading}
                    >
                      <FiEdit2 size={16} />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      className={`btn btn-sm btn-icon rounded-3 ${
                        isSelf
                          ? 'text-muted opacity-50 cursor-not-allowed'
                          : 'text-danger hover-bg-danger-subtle'
                      }`}
                      title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
                      onClick={() => !isSelf && onDelete && onDelete(user)}
                      disabled={isSelf || isRowLoading}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
