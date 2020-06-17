(function () {
  const selectVal = document.getElementsByTagName("select");
  // Create DB
  var dbPromise = localDB.open("bundesliga", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favTim")) {
      var myteamOS = upgradeDb.createObjectStore("favTim", {
        keypath: "id",
      });
      myteamOS.createIndex("teamName", "teamName", { unique: true });
      myteamOS.createIndex("teamLogo", "teamLogo", { unique: false });
    }
  });

  // CRUD : Create
  var CRUD = {
    add: function (team) {
      var teamName = team.name;
      var teamLogo = team.crestUrl;
      var id = team.id;
      if (teamName === "") {
        M.toast({
          html: "<strong>Team not set</strong>",
          classes: "amber lighten-3 brown-text",
        });
      } else {
        // read data
        dbPromise
          .then(function (db) {
            var tx = db.transaction("favTim", "readwrite");
            var store = tx.objectStore("favTim");
            var item = {
              teamName,
              teamLogo,
              created: id,
            };
            store.put(item, id);
            return tx.complete;
          })
          .then(function () {
            M.toast({
              html: `<strong>${teamName} telah ditambahkan ke favorit</strong>`,
              classes: "green lighten-3 green-text text-darken-4",
            });
          })
          .catch(function () {
            M.toast({
              html: `<strong>${teamName} sudah ditambahkan ke favorit</strong>`,
              classes: "green lighten-3 green-text text-darken-4",
            });
          });
      }
    },
    read: function () {
      dbPromise
        .then(function (db) {
          var tx = db.transaction("favTim", "readonly");
          var store = tx.objectStore("favTim");
          return store.getAll();
        })
        .then(function (items) {
          viewRender.loadFavorite(items);
        });
    },
    remove: function (id) {
      var deleteVal = id;
      dbPromise
        .then(function (db) {
          var tx = db.transaction("favTim", "readwrite");
          var store = tx.objectStore("favTim");
          store.delete(parseInt(deleteVal));
          return tx.complete;
        })
        .then(function () {
          crud.read();
          M.toast({
            html: `<strong>Team has been deleted</strong>`,
            classes: "green lighten-3 green-text text-darken-4",
          });
        });
    },
  };

  if (typeof module !== "undefined") {
    module.exports = CRUD;
    module.exports.default = module.exports;
  } else {
    self.crud = CRUD;
  }
})();
