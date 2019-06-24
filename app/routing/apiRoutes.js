// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests
    // req.body is available since we're using the body parsing middleware

    var userScores = req.body.scores;
    var allscores = [];
    for (var y = 0; y < friendsData.length; y++) {
      var dataScore = friendsData[y].scores;
      var x = [];
      for (var i = 0; i <= dataScore.length - 1; i++) {
        x.push(Math.abs(userScores[i] - dataScore[i]));
      }
      var total = x.reduce((a, b) => a + b, 0);
      allscores.push(total);
    }
    const indexOfMinscore = allscores.indexOf(Math.min(...allscores));

    var match = friendsData[indexOfMinscore];
    friendsData.push(req.body);
    res.send(match);
  });
};
