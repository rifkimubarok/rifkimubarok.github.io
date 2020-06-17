(function () {
  const klasemenUri =
    "https://api.football-data.org/v2/competitions/2002/standings";
  const scoreUri = "https://api.football-data.org/v2/competitions/2002/scorers";
  const headerToken = {
    "X-Auth-Token": "4a2c6394f3794d4596e47b3c0e4d494f",
  };

  const status = function (response) {
    if (response.status !== 200) {
      console.log("Error: " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
  };

  const json = function (response) {
    return response.json();
  };

  const api = {
    loadKlasemen: function () {
      if ("caches" in window) {
        caches.match(klasemenUri).then(function (response) {
          if (response) {
            response.json().then(function (result) {
              viewRender.loadKlasemen(result);
            });
          }
        });
      }
      fetch(klasemenUri, {
        headers: headerToken,
      })
        .then(status)
        .then(json)
        .then(function (result) {
          viewRender.loadKlasemen(result);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    loadScore: function () {
      if ("caches" in window) {
        caches.match(scoreUri).then(function (response) {
          if (response) {
            response.json().then(function (result) {
              viewRender.loadScore(result);
            });
          }
        });
      }
      fetch(scoreUri, {
        headers: headerToken,
      })
        .then(status)
        .then(json)
        .then(function (result) {
          viewRender.loadScore(result);
        });
    },
  };

  if (typeof module !== "undefined") {
    module.exports = CRUD;
    module.exports.default = module.exports;
  } else {
    self.api = api;
  }
})();
