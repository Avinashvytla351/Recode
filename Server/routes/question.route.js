let middleware = require("../util/middleware.js");

module.exports = (app) => {
  const questions = require("../controllers/question.controller.js");

  // Create a new question
  app.post("/questions", middleware.checkTokenAdmin, questions.create);

  // Create a new question
  app.post(
    "/questionsExcel",
    middleware.checkTokenAdmin,
    questions.createExcel
  );

  // Create a new question
  app.post(
    "/questionsExcel/:contestId",
    middleware.checkTokenAdmin,
    questions.createSet
  );

  // Create a new set
  app.post(
    "/questionIds/:contestId",
    middleware.checkTokenAdmin,
    questions.addSetGivenQIdArray
  );

  // Create a new question for Tutorials
  app.post(
    "/questiontutorials",
    middleware.checkTokenAdmin,
    questions.createTutorials
  );

  // Create a new question for Tutorials
  app.post(
    "/questiontutorialsExcel",
    middleware.checkTokenAdmin,
    questions.createTutorialsExcel
  );

  // Retrieve all questions
  app.get("/questions", middleware.checkTokenAdmin, questions.findAll);

  // Retrieve a single questionName with questionId Public
  app.get("/questions/name/:questionId", questions.getQuestionName);

  // Retrieve a single question with questionId
  app.get("/questions/:questionId", middleware.checkToken, questions.findOne);

  // Retrieve all questions with contestId
  app.get(
    "/questions/contests/:contestId",
    middleware.checkToken,
    questions.findAllContest
  );
  app.get(
    "/questions/practice/:division",
    middleware.checkToken,
    questions.findPracticeNames
  );

  app.get(
    "/questions/practice/:division/:title",
    middleware.checkToken,
    questions.findPracticeByTitle
  );
  //Delete multiple questions
  app.post(
    "/deletequestions/multiple/:questionIds",
    middleware.checkTokenAdmin,
    questions.deleteMultiple
  );

  // Update a question with questionId
  app.post("/questions/:questionId", middleware.checkToken, questions.update);

  // Delete a question with questionId
  app.delete(
    "/questions/:questionId",
    middleware.checkTokenAdmin,
    questions.delete
  );
};
