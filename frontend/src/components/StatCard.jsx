const StatCard = ({
  title,
  value,
  icon,
  badgeText,
  badgeType = 'primary',
  colorScheme = 'blue',
}) => {
  const schemeStyles = {
    blue: {
      iconBg: 'rgba(37, 99, 235, 0.1)',
      iconColor: '#2563eb',
      borderLeft: '4px solid #2563eb',
    },
    green: {
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981',
      borderLeft: '4px solid #10b981',
    },
    amber: {
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#f59e0b',
      borderLeft: '4px solid #f59e0b',
    },
    purple: {
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8b5cf6',
      borderLeft: '4px solid #8b5cf6',
    },
  };

  const currentScheme = schemeStyles[colorScheme] || schemeStyles.blue;

  return (
    <div
      className="card border-0 shadow-sm rounded-4 h-100 stat-card transition-all"
      style={{ borderLeft: currentScheme.borderLeft }}
    >
      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="text-muted fw-semibold text-uppercase tracking-wider small">
            {title}
          </span>
          <div
            className="rounded-3 d-flex align-items-center justify-content-center"
            style={{
              width: '46px',
              height: '46px',
              backgroundColor: currentScheme.iconBg,
              color: currentScheme.iconColor,
            }}
          >
            {icon}
          </div>
        </div>

        <div>
          <h2 className="display-6 fw-bold text-dark mb-2 tracking-tight">
            {value !== undefined && value !== null ? value : 0}
          </h2>
          {badgeText && (
            <span
              className={`badge bg-${badgeType}-subtle text-${badgeType} rounded-pill px-3 py-1 fw-semibold small`}
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
