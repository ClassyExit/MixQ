export function showNotification(
  message: string,
  type: "info" | "error" | "warning" | "success" = "info",
  duration: number = 3000
) {
  const alerts = {
    info: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      bgColor: "var(--color-info)",
      textColor: "var(--color-info-content)",
    },
    error: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
      bgColor: "var(--color-error)",
      textColor: "var(--color-error-content)",
    },
    warning: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
      bgColor: "var(--color-warning)",
      textColor: "var(--color-warning-content)",
    },
    success: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
      bgColor: "var(--color-success)",
      textColor: "var(--color-success-content)",
    },
  };

  const container = document.getElementById("notification-container");
  if (!container) return;

  const notificationId = `notification-${Date.now()}`;

  // Create notification element
  const notification = document.createElement("div");
  notification.id = notificationId;
  notification.className = `p-4 rounded-lg shadow-lg flex items-center space-x-2 transition-opacity duration-300`;

  // Apply styles
  notification.style.backgroundColor = alerts[type].bgColor;
  notification.style.color = alerts[type].textColor;

  // Add content
  notification.innerHTML = `
    <span class="h-6 w-6">${alerts[type].icon}</span>
    <span>${message}</span>
  `;

  // Append to container
  container.appendChild(notification);

  // Auto-remove after duration
  setTimeout(() => {
    notification.classList.remove("opacity-100");
    setTimeout(() => notification.remove(), 300);
  }, duration);
}
