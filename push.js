var webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BIWs9vmUm7rvZkFq4YPCmhdY9BwbzZ262wAhfsk8SHtMuWJPOiZMIbMVS0auCcVp978-fMFm3rtZsYUuTit0vQ0",
  privateKey: "LG3cH3SBzsvdwR5dHrM-QYdEEWPX4xPaZ-ijL2_ShdM",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fRY0M3014oU:APA91bEqNvz5XG3J0tBXrtDAejR3dFQTlEa0vT99eUWpifDdOGusom4_BObogX8j6-eDkOzjOmhVLIaPTKKlWT6U3Xi4Cq1S42VB5JvQvLNcUoUwjY2_oZeE8bZ7E__EWGu8G2H8XZgu",
  keys: {
    p256dh:
      "BCakI9nIiZvriPHOs8um2nYd1ujimHCxVzle/AqLC9ZaV6HO5STTH2DHRb7w1H9l3hLJW0E/H3KW7dUmsBKr/v4=",
    auth: "Jenkz6CgHWB68jWPmFYnGw==",
  },
};
var payload = "Oh iya ini notif!";
var options = {
  gcmAPIKey: "129025570795",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options).catch((error) => {
  console.log(error);
});
