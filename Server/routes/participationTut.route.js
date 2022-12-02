let middleware = require("../util/middleware.js");

module.exports = (app) => {
  const participation = require("../controllers/participationTut.controller.js");

  // Create a new participation
  app.get("/tparticipations", middleware.checkToken, participation.create);

  app.get(
    "/tparticipations",
    middleware.checkTokenAdmin,
    participation.findAll
  );

  // Retrieve all participations per contestId in body
  // app.post('/tparticipations/all', middleware.checkToken, participation.findContestPart);

  // Retrieve all participations for user in a contest
  app.get(
    "/tparticipations/getOne",
    middleware.checkToken,
    participation.findUser
  );
};
