export function showNotification(
  message: string,
  type: string,
  duration: number = 3000
) {
  const notification = document.getElementById("notification");
  const messageSpan = document.getElementById("notification-message");
  const typeAlert = document.getElementById("notification-type");

  if (!notification || !messageSpan || !typeAlert) return;

  messageSpan.textContent = message;
  typeAlert.textContent = type;
  notification.classList.remove("hidden");
  notification.classList.add("opacity-100");

  // Hide after duration
  setTimeout(() => {
    hideNotification();
  }, duration);
}

export function hideNotification() {
  const notification = document.getElementById("notification");
  if (!notification) return;

  notification.classList.add("hidden");
}
