(function () {
  const main = {
    loadKlasemen: function (result) {
      const klasemenTable = document.querySelector("#klasemen");
      const klasemens = result.hasOwnProperty("standings")
        ? result.standings
        : [];
      const klasemen = klasemens.length > 0 ? klasemens[0] : undefined;
      if (klasemen) {
        let table = "";
        let dataAction = {};
        klasemen.table.forEach(function (data, index) {
          dataAction[data.team.id] = data.team;
          button = `
                  <button class="btn btn-small btn-fav" data-id="${data.team.id}"><i class="material-icons">star_border</i>
                  </button>`;
          table += `
                    <tr>
                      <td width="15" class="center-align"><strong>${
                        data.position
                      }.</strong></td>
                      <td width="40"><div class="center-align"><img src="${data.team.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                      )}" height="30"/></div></td>
                      <td class="hide-on-small-only"><strong>${
                        data.team.name
                      }</strong></td>
                      <td>${data.playedGames}</td>
                      <td>${data.won}</td>
                      <td>${data.draw}</td>
                      <td>${data.lost}</td>
                      <td>${data.goalsFor}</td>
                      <td>${data.goalsAgainst}</td>
                      <td>${data.goalDifference}</td>
                      <td><strong>${data.points}</strong></td>
                      <td  width="50px">
                          ${button}
                      </td>
                    </tr>
                `;
        });
        klasemenTable.innerHTML = table;
        btnFav = document.querySelectorAll(".btn-fav");
        btnFav.forEach((item) => {
          item.addEventListener("click", function () {
            let id = parseInt(item.getAttribute("data-id"));
            crud.add(dataAction[id]);
          });
        });
      }
    },
    loadScore: function (result) {
      const skor = document.querySelector("#skor");
      scorers = result.hasOwnProperty("scorers") ? result.scorers : [];
      let table = "";
      scorers.forEach(function (score, index) {
        table += `
              <tr>
                <td>${index + 1}</td>
                <td>${score.player.name} <sup class="red-text">${
          score.player.position
        }</sup> </td>
                <td>${score.team.name} </td>
                <td><strong>${score.numberOfGoals}</strong> </td>
              </tr>
            `;
      });
      skor.innerHTML = table;
    },
    loadFavorite: function (items) {
      var myteam = document.querySelector("#tim");
      var table = "";
      var i = 1;
      items.forEach((item) => {
        table += `
          <tr>
            <td width="30" class="center-align"><strong>${i++}.</strong></td>
            <td>
              <div class="center-align"><img src="${item.teamLogo.replace(
                /^http:\/\//i,
                "https://"
              )}" height="30"/></div>
            </td>
            <td>
            <strong>${item.teamName}</strong></td>   
            <td>
              <button class="btn-small waves-effect waves-light red" onclick="crud.remove(${
                item.created
              });">
                Delete
              </button>
            </td>
          </tr>
        `;
      });
      myteam.innerHTML = table;
    },
  };

  if (typeof module !== "undefined") {
    module.exports = main;
    module.exports.default = module.exports;
  } else {
    self.viewRender = main;
  }
})();
