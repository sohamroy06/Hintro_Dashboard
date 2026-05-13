export const toast = (message) => {
  // Simple toast implementation
  // You can replace this with a proper toast library like react-hot-toast later
  const toastElement = document.createElement('div');
  toastElement.textContent = message;
  toastElement.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  document.body.appendChild(toastElement);

  // Add animation styles if not already present
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Remove after 3 seconds
  setTimeout(() => {
    toastElement.remove();
  }, 3000);
};
