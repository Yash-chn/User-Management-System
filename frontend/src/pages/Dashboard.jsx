import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiShield,
  FiUserPlus,
  FiRefreshCw,
  FiArrowRight,
  FiAlertCircle,
  FiPieChart,
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalAdmins: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null,
    loading: false,
  });

  const fetchDashboardStats = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);
      setError('');

      const res = await userService.getStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const handleToggleStatus = async (targetUser) => {
    try {
      setActionLoadingId(targetUser._id);
      const newStatus = targetUser.status === 'active' ? 'inactive' : 'active';
      const res = await userService.updateStatus(targetUser._id, newStatus);
      if (res.success) {
        fetchDashboardStats(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleOpenDelete = (targetUser) => {
    setDeleteModal({
      isOpen: true,
      user: targetUser,
      loading: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.user) return;
    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));
      const res = await userService.deleteUser(deleteModal.user._id);
      if (res.success) {
        setDeleteModal({ isOpen: false, user: null, loading: false });
        fetchDashboardStats(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user.');
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleEdit = (targetUser) => {
    navigate('/users', { state: { editUserId: targetUser._id } });
  };

  const activeRate = stats.totalUsers > 0
    ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
    : 0;

  return (
    <div className="admin-layout d-flex min-vh-100 bg-body-tertiary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main-wrapper flex-grow-1 d-flex flex-column">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          pageTitle="Dashboard"
        />

        <main className="content-container p-3 p-md-4 p-xl-5 flex-grow-1">
          {/* Welcome Banner */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h2 className="fw-bold text-dark mb-1">
                  Welcome back, {user?.name || 'Admin'}
                </h2>
                <p className="text-muted small mb-0">
                  Quick overview of registered users and platform metrics.
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-medium"
                  onClick={() => fetchDashboardStats(true)}
                  disabled={refreshing || loading}
                >
                  <FiRefreshCw className={refreshing ? 'spin-icon' : ''} size={15} />
                  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>

                <Link
                  to="/users/add"
                  className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
                >
                  <FiUserPlus size={16} />
                  <span>Add User</span>
                </Link>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 py-3 px-4 mb-4 shadow-sm" role="alert">
              <FiAlertCircle size={20} className="flex-shrink-0" />
              <div>{error}</div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="row g-3 g-xl-4 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<FiUsers size={22} />}
                badgeText="All Accounts"
                badgeType="primary"
                colorScheme="blue"
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                title="Active Users"
                value={stats.activeUsers}
                icon={<FiUserCheck size={22} />}
                badgeText={`${activeRate}% of total`}
                badgeType="success"
                colorScheme="green"
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                title="Inactive Users"
                value={stats.inactiveUsers}
                icon={<FiUserX size={22} />}
                badgeText="Deactivated"
                badgeType="warning"
                colorScheme="amber"
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                title="Administrators"
                value={stats.totalAdmins}
                icon={<FiShield size={22} />}
                badgeText="Admins"
                badgeType="info"
                colorScheme="purple"
              />
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="row g-3 g-xl-4 mb-4">
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Account Distribution</h5>
                    <small className="text-muted">Active vs Inactive status</small>
                  </div>
                  <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill">
                    Status Overview
                  </span>
                </div>

                <div className="my-3">
                  <div className="d-flex justify-content-between small fw-semibold text-secondary mb-1">
                    <span>Active Accounts ({stats.activeUsers})</span>
                    <span>{activeRate}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-success rounded-pill"
                      role="progressbar"
                      style={{ width: `${activeRate}%` }}
                      aria-valuenow={activeRate}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="row g-3 mt-3 pt-3 border-top">
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block mb-1">Standard Users</small>
                    <span className="h5 fw-bold text-dark">
                      {Math.max(0, stats.totalUsers - stats.totalAdmins)}
                    </span>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block mb-1">Admins</small>
                    <span className="h5 fw-bold text-dark">{stats.totalAdmins}</span>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block mb-1">Active Rate</small>
                    <span className="h5 fw-bold text-success">{activeRate}%</span>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block mb-1">Inactive Rate</small>
                    <span className="h5 fw-bold text-warning">
                      {100 - activeRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="p-2 bg-primary-subtle text-primary rounded-3">
                      <FiPieChart size={20} />
                    </div>
                    <h5 className="fw-bold text-dark mb-0">Quick Actions</h5>
                  </div>
                  <p className="text-muted small mb-4">
                    Create new user accounts, update permissions, or browse user records.
                  </p>
                </div>

                <div className="d-flex flex-column gap-2">
                  <Link
                    to="/users/add"
                    className="btn btn-outline-primary py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  >
                    <FiUserPlus size={16} />
                    <span>Create User</span>
                  </Link>

                  <Link
                    to="/users"
                    className="btn btn-primary py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <span>View All Users</span>
                    <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold text-dark mb-0">Recent Users</h5>
                <small className="text-muted">Recently created accounts</small>
              </div>
              <Link
                to="/users"
                className="btn btn-link text-primary text-decoration-none fw-semibold small p-0 d-flex align-items-center gap-1"
              >
                <span>View all</span>
                <FiArrowRight size={14} />
              </Link>
            </div>

            <div className="p-0">
              <UserTable
                users={stats.recentUsers}
                currentUserId={user?._id}
                onEdit={handleEdit}
                onDelete={handleOpenDelete}
                onToggleStatus={handleToggleStatus}
                actionLoadingId={actionLoadingId}
              />
            </div>
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        userName={deleteModal.user?.name}
        userEmail={deleteModal.user?.email}
        isLoading={deleteModal.loading}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModal({ isOpen: false, user: null, loading: false })}
      />
    </div>
  );
};

export default Dashboard;
