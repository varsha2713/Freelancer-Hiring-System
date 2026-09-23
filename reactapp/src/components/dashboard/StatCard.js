import React from 'react';

export default function StatCard({ label, value, icon }) {
  return (
    <div className="quick-stat">
      {icon && <span className="stat-icon">{icon}</span>}
      <span className="stat-label">{label}</span>
      <span className="stat-value-large">{value}</span>
    </div>
  );
}
