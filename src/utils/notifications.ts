export function showNotification(
  message: string,
  type: "info" | "error" | "warning" | "success" = "info",
  duration: number = 1500
) {
  const alerts = {
    info: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-full w-full stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      bgColor: "var(--color-info)",
      textColor: "var(--color-info-content)",
    },
    error: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full  stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
      bgColor: "var(--color-error)",
      textColor: "var(--color-error-content)",
    },
    warning: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
      bgColor: "var(--color-warning)",
      textColor: "var(--color-warning-content)",
    },
    success: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
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
  notification.className = `alert alert-${type} flex items-center space-x-2 transition-opacity duration-300`;

  // Apply styles
  notification.style.backgroundColor = alerts[type].bgColor;
  notification.style.color = alerts[type].textColor;

  // Add content
  notification.innerHTML = `
    <span class="h-6 w-6 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 3xl:h-12 3xl:w-12 4xl:h-16 4xl:w-16 5xl:h-20 5xl:w-20 6xl:h-26 6xl:w-26">${alerts[type].icon}</span>
    <span class="text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-6xl 6xl:text-8xl">${message}</span>
  `;

  // Append to container
  container.appendChild(notification);

  // Auto-remove after duration
  setTimeout(() => {
    notification.classList.remove("opacity-100");
    setTimeout(() => notification.remove(), 200);
  }, duration);
}
