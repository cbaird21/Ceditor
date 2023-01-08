const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    butInstall.style.display = "none";
    window.deferredPrompt.prompt();
    const userChoice = await window.deferredPrompt.userChoice;
    window.deferredPrompt = null;
    if (userChoice.outcome === "accepted") {
        console.log("User wants to install Jate");
    } else {
        console.log("User doesn't want to install")
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("Jate has been installed")
});
