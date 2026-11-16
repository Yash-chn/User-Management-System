import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';
import {
  FiSearch,
  FiFilter,
  FiUserPlus,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiEdit3,
} from 'react-icons/fi';

const Users = () => {
  const { user: currentUser } = useAuth();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null,
    loading: false,
  });

  // Edit modal state
  const [editModal, setEditModal] = useState({
    isOpen: false,
    user: null,
    loading: false,
    formData: {
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      password: '',
    },
    error: '',
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (roleFilter !== 'all') params.role = roleFilter;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await userService.getUsers(params);
      if (res.success) {
        setUsers(res.users);

        // Check if navigated with an edit request
        if (location.state?.editUserId) {
          const target = res.users.find((u) => u._id === location.state.editUserId);
          if (target) {
            handleOpenEdit(target);
          }
          // Clear state so it doesn't pop up again
          window.history.replaceState({}, document.title);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users list.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, roleFilter, statusFilter, location.state]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle status toggle
  const handleToggleStatus = async (targetUser) => {
    try {
      setActionLoadingId(targetUser._id);
      setError('');
      setSuccessMsg('');

      const newStatus = targetUser.status === 'active' ? 'inactive' : 'active';
      const res = await userService.updateStatus(targetUser._id, newStatus);

      if (res.success) {
        setSuccessMsg(`Status of "${targetUser.name}" changed to ${newStatus}.`);
        setUsers((prev) =>
          prev.map((u) => (u._id === targetUser._id ? { ...u, status: newStatus } : u))
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (targetUser) => {
    setEditModal({
      isOpen: true,
      user: targetUser,
      loading: false,
      formData: {
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        status: targetUser.status,
        password: '',
      },
      error: '',
    });
  };

  // Save Edit Form
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { name, email, role, status, password } = editModal.formData;
    const userId = editModal.user._id;

    if (!name || !email) {
      setEditModal((prev) => ({ ...prev, error: 'Name and email are required.' }));
      return;
    }

    try {
      setEditModal((prev) => ({ ...prev, loading: true, error: '' }));
      const payload = { name, email, role, status };
      if (password && password.trim()) {
        payload.password = password.trim();
      }

      const res = await userService.updateUser(userId, payload);
      if (res.success) {
        setSuccessMsg(`User "${res.user.name}" updated successfully.`);
        setEditModal({ isOpen: false, user: null, loading: false, formData: {}, error: '' });
        fetchUsers();
      }
    } catch (err) {
      setEditModal((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to update user.',
      }));
    }
  };

  // Open Delete Modal
  const handleOpenDelete = (targetUser) => {
    setDeleteModal({
      isOpen: true,
      user: targetUser,
      loading: false,
    });
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteModal.user) return;
    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));
      setError('');
      setSuccessMsg('');

      const res = await userService.deleteUser(deleteModal.user._id);
      if (res.success) {
        setSuccessMsg(res.message);
        setDeleteModal({ isOpen: false, user: null, loading: false });
        fetchUsers();
      }
    } catch (err) {
      setDeleteModal({ isOpen: false, user: null, loading: false });
      setError(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="admin-layout d-flex min-vh-100 bg-body-tertiary">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="admin-main-wrapper flex-grow-1 d-flex flex-column">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          pageTitle="User Management"
        />

        <main className="content-container p-3 p-md-4 p-xl-5 flex-grow-1">
          {/* Action Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h2 className="fw-bold text-dark mb-0">System Users</h2>
                <span className="badge bg-primary rounded-pill px-3 py-1">
                  {users.length} {users.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>
              <p className="text-muted small mb-0">
                View, search, edit, activate/deactivate, and manage accounts.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-medium shadow-2xs"
                onClick={fetchUsers}
                disabled={loading}
              >
                <FiRefreshCw className={loading ? 'spin-icon' : ''} size={15} />
                <span>Refresh</span>
              </button>

              <Link
                to="/users/add"
                className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-4 py-2 fw-semibold shadow-sm"
              >
                <FiUserPlus size={16} />
                <span>Add New User</span>
              </Link>
            </div>
          </div>

          {/* Alert notifications */}
          {successMsg && (
            <div
              className="alert alert-success d-flex align-items-center justify-content-between rounded-3 py-2 px-3 small mb-4 shadow-sm"
              role="alert"
            >
              <div className="d-flex align-items-center gap-2">
                <FiCheckCircle size={18} className="flex-shrink-0" />
                <div>{successMsg}</div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-sm"
                onClick={() => setSuccessMsg('')}
                aria-label="Close"
              />
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger d-flex align-items-center justify-content-between rounded-3 py-2 px-3 small mb-4 shadow-sm"
              role="alert"
            >
              <div className="d-flex align-items-center gap-2">
                <FiAlertCircle size={18} className="flex-shrink-0" />
                <div>{error}</div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-sm"
                onClick={() => setError('')}
                aria-label="Close"
              />
            </div>
          )}

          {/* Filter & Search Toolbar */}
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
            <div className="row g-2 align-items-center">
              {/* Search input */}
              <div className="col-12 col-md-5">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <FiSearch size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-1"
                    placeholder="Search by name or email address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="btn btn-light border border-start-0"
                      onClick={() => setSearchQuery('')}
                      type="button"
                    >
                      <FiX size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Role Filter */}
              <div className="col-6 col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <FiFilter size={14} />
                  </span>
                  <select
                    className="form-select bg-light border-start-0"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Administrators</option>
                    <option value="user">Standard Users</option>
                  </select>
                </div>
              </div>

              {/* Status Filter */}
              <div className="col-6 col-md-3">
                <select
                  className="form-select bg-light"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>

              {/* Reset button */}
              <div className="col-12 col-md-1 d-grid">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm py-2 rounded-3"
                  onClick={handleResetFilters}
                  title="Reset search and filters"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* User Table Component */}
          {loading ? (
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
              <div className="spinner-border text-primary mx-auto mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted small mb-0">Loading users...</p>
            </div>
          ) : (
            <UserTable
              users={users}
              currentUserId={currentUser?._id}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onToggleStatus={handleToggleStatus}
              actionLoadingId={actionLoadingId}
            />
          )}
        </main>
      </div>

      {/* Edit User Modal */}
      {editModal.isOpen && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050 }}
            onClick={() => setEditModal({ ...editModal, isOpen: false })}
          />
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1055 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header border-bottom py-3 px-4">
                  <div className="d-flex align-items-center gap-2">
                    <div className="p-2 rounded-3 bg-primary-subtle text-primary">
                      <FiEdit3 size={18} />
                    </div>
                    <div>
                      <h5 className="modal-title fw-bold text-dark mb-0">Edit User Profile</h5>
                      <small className="text-muted">{editModal.user?.email}</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditModal({ ...editModal, isOpen: false })}
                    disabled={editModal.loading}
                  />
                </div>

                <form onSubmit={handleSaveEdit}>
                  <div className="modal-body px-4 py-3">
                    {editModal.error && (
                      <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" role="alert">
                        {editModal.error}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={editModal.formData.name}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            formData: { ...editModal.formData, name: e.target.value },
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={editModal.formData.email}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            formData: { ...editModal.formData, email: e.target.value },
                          })
                        }
                        required
                      />
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-semibold text-secondary">
                          Role
                        </label>
                        <select
                          className="form-select"
                          value={editModal.formData.role}
                          onChange={(e) =>
                            setEditModal({
                              ...editModal,
                              formData: { ...editModal.formData, role: e.target.value },
                            })
                          }
                          disabled={currentUser?._id === editModal.user?._id}
                        >
                          <option value="user">Standard User</option>
                          <option value="admin">Administrator</option>
                        </select>
                        {currentUser?._id === editModal.user?._id && (
                          <small className="text-muted fs-xs">Cannot demote own account</small>
                        )}
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-semibold text-secondary">
                          Status
                        </label>
                        <select
                          className="form-select"
                          value={editModal.formData.status}
                          onChange={(e) =>
                            setEditModal({
                              ...editModal,
                              formData: { ...editModal.formData, status: e.target.value },
                            })
                          }
                          disabled={currentUser?._id === editModal.user?._id}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        {currentUser?._id === editModal.user?._id && (
                          <small className="text-muted fs-xs">Cannot deactivate own account</small>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label small fw-semibold text-secondary">
                        New Password <span className="text-muted fw-normal">(Leave blank to keep existing)</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={editModal.formData.password}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            formData: { ...editModal.formData, password: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="modal-footer border-top py-3 px-4 d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-light px-4 py-2 rounded-3 border fw-medium"
                      onClick={() => setEditModal({ ...editModal, isOpen: false })}
                      disabled={editModal.loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm"
                      disabled={editModal.loading}
                    >
                      {editModal.loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete User Account"
        message="Are you sure you want to permanently delete this user? All user data will be removed from MongoDB."
        userName={deleteModal.user?.name}
        userEmail={deleteModal.user?.email}
        isLoading={deleteModal.loading}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModal({ isOpen: false, user: null, loading: false })}
      />
    </div>
  );
};

export default Users;
