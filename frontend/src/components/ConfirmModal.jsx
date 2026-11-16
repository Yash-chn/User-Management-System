import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmModal = ({
  isOpen,
  title = 'Confirm Action',
  message,
  userName,
  userEmail,
  onConfirm,
  onClose,
  confirmButtonText = 'Delete User',
  isLoading = false,
  isDangerous = true,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} onClick={onClose} />
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
            <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
              <div className="d-flex align-items-center gap-2">
                <div
                  className={`p-2 rounded-circle ${
                    isDangerous ? 'bg-danger-subtle text-danger' : 'bg-primary-subtle text-primary'
                  }`}
                >
                  <FiAlertTriangle size={24} />
                </div>
                <h5 className="modal-title fw-bold text-dark">{title}</h5>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
                disabled={isLoading}
              />
            </div>

            <div className="modal-body px-4 py-3">
              <p className="text-secondary mb-3">
                {message || 'Are you sure you want to proceed with this action? This operation cannot be undone.'}
              </p>

              {(userName || userEmail) && (
                <div className="bg-light p-3 rounded-3 border">
                  {userName && (
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small fw-medium">User:</span>
                      <span className="text-dark small fw-bold">{userName}</span>
                    </div>
                  )}
                  {userEmail && (
                    <div className="d-flex justify-content-between">
                      <span className="text-muted small fw-medium">Email:</span>
                      <span className="text-dark small fw-semibold text-break">{userEmail}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer border-top-0 pt-0 pb-4 px-4 d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-light px-4 py-2 rounded-3 fw-medium border"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn ${isDangerous ? 'btn-danger' : 'btn-primary'} px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2 shadow-sm`}
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    <span>Processing...</span>
                  </>
                ) : (
                  confirmButtonText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
