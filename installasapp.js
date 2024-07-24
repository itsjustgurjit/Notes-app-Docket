window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event; // Store the event object
  installButton.disabled = false; // Enable the install button
});

const installButton = document.getElementById("install-button");
installButton.addEventListener("click", () => {
  deferredPrompt.prompt(); // Trigger the installation prompt
  installButton.disabled = true; // Disable the install button after clicking
});

// Check if `deferredPrompt` is already available from a previous session
if (deferredPrompt) {
  installButton.disabled = false; // Enable the install button if available
}
