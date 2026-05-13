import './SkeletonLoader.css';

export function SkeletonBox({ width, height, radius, style }) {
  return (
    <div
      className="skeleton-box"
      style={{
        width: width || '100%',
        height: height || '16px',
        borderRadius: radius || 'var(--radius-sm)',
        ...style,
      }}
    />
  );
}

export function SkeletonStatCard() {
  return (
    <div className="skeleton-stat-card">
      <SkeletonBox width="44px" height="44px" radius="var(--radius-md)" />
      <div className="skeleton-stat-content">
        <SkeletonBox width="70%" height="13px" />
        <SkeletonBox width="40%" height="24px" style={{ marginTop: '6px' }} />
      </div>
    </div>
  );
}

export function SkeletonCallItem() {
  return (
    <div className="skeleton-call-item">
      <SkeletonBox width="40px" height="40px" radius="var(--radius-md)" />
      <div className="skeleton-call-content">
        <SkeletonBox width="55%" height="14px" />
        <SkeletonBox width="30%" height="12px" style={{ marginTop: '4px' }} />
      </div>
      <SkeletonBox width="60px" height="13px" style={{ marginLeft: 'auto' }} />
    </div>
  );
}
