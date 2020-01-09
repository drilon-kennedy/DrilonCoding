'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById("butInstall");
installButton.addEventListener("click", installPWA);

//Add event listener for beforeInstallPrompt event
window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

/**
 *Event handler for beforeinstallprompt event.
 *Saves the event & shows install button.
 *
 *@param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAtrribute("hidden");
}

function installPWA(evt) {
  //Show install prompt
  deferredInstallPrompt.prompt();

  //Hide the install button, it can't beinstalled twice
  evt.srcElement.setAttribute("hidden", true);

  //Log user response to prompt
  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === "accepted") {
      console.log("User accepted the A2HS prompt", choice);
    } else {
      console.log("User dismissed the A2HS prompt", choice);
    }
    deferredInstallPrompt = null;
  });
} //installPWA

//Add event listener fpr appinstalled event
window.addEventListener("appinstalled", logAppInstalled);

function logAppInstalled(evt) {
  //Log the event, in a real app, you would save this information
  //in a file, database, or analytics software
  console.log("Jewish Calendar App was installed", evt);
}
