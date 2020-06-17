if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("ServiceWorker registerd");
      })
      .catch(function () {
        console.log("Fail to register ServiceWorker");
      });
  });
} else {
  console.log("The browser not support ServiceWorker.");
}
