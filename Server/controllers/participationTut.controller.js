const Participation = require("../models/participationTut.model.js");
const inarray = require("inarray");

var moment = require("moment");
// Create and Save a new participation
exports.create = (req, res) => {
  req.body.username = req.decoded.username;
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      success: false,
      message: "user Id can not be empty",
    });
  }

  Participation.find({ participationId: req.body.username + "practice" })
    .then((participation) => {
      if (participation.length === 0) {
        // Create a Participation

        const participation = new Participation({
          participationId: req.body.username + "practice",
          username: req.body.username,
          submissionResults: [],
          easySolved: [],
          mediumSolved: [],
          hardSolved: [],
        });

        // Save participation in the database
        participation
          .save()
          .then((data) => {
            res.send({
              success: true,
              data: data,
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message: err.message || "Some error occurred while Registering.",
            });
          });
      } else {
        res.send({ success: false, message: "User already participated" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};

exports.insertDifficultyWise = (sub, callback) => {
  Participation.find({ participationId: sub.participationId })
    .then((participation) => {
      if (!participation) {
        return callback("Participation not found with Id ", null);
      }
      participation = participation[0];
      // console.log(participation);
      // console.log(sub);
      if (sub.difficulty === "Easy") {
        if (sub.score === 100) {
          let exists = inarray(participation.easySolved, sub.questionId);
          if (!exists) {
            participation.easySolved.push(sub.questionId);
            participation.submissionResults.push(sub.questionId);
            participation.save();
          } else {
            return callback(null, participation);
          }
          return callback(null, participation);
        } else {
          // console.log("Returned");
          return callback(null, participation);
        }
      } else if (sub.difficulty === "Medium") {
        if (sub.score === 100) {
          let exists = inarray(participation.mediumSolved, sub.questionId);
          if (!exists) {
            participation.mediumSolved.push(sub.questionId);
            participation.submissionResults.push(sub.questionId);
            participation.save();
          } else {
            return callback(null, participation);
          }
          return callback(null, participation);
        } else {
          return callback(null, participation);
        }
      } else if (sub.difficulty === "Hard") {
        if (sub.score === 100) {
          let exists = inarray(participation.hardSolved, sub.questionId);
          if (!exists) {
            participation.hardSolved.push(sub.questionId);
            participation.submissionResults.push(sub.questionId);
            participation.save();
          } else {
            return callback(null, participation);
          }
          return callback(null, participation);
        } else {
          return callback(null, participation);
        }
      } else if (sub.difficulty === "contest") {
        if (sub.score === 100) {
          let exists = inarray(participation.contestSolved, sub.questionId);
          if (!exists) {
            participation.contestSolved.push(sub.questionId);
            participation.submissionResults.push(sub.questionId);
            participation.save();
          } else {
            return callback(null, participation);
          }
          return callback(null, participation);
        } else {
          return callback(null, participation);
        }
      } else if (sub.difficulty === "topics") {
        if (sub.score === 100) {
          let exists = inarray(participation.contestSolved, sub.questionId);
          if (!exists) {
            participation.practiceSolved.push(sub.questionId);
            participation.submissionResults.push(sub.questionId);
            participation.save();
          } else {
            return callback(null, participation);
          }
          return callback(null, participation);
        } else {
          return callback(null, participation);
        }
      } else {
        return callback("Question difficulty not set, contact admin", null);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId") {
        return callback("Participation not found with Id ", null);
      }
      return callback("Error updating Participation with Id ", null);
    });
};

// Retrieve and return all participations from the database.
exports.findAll = (req, res) => {
  Participation.find()
    .then((participation) => {
      res.send(participation);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};

// Retrieve and return all participation details for user in contest.
exports.findUser = (req, res) => {
  Participation.find({
    participationId: req.decoded.username + "practice",
  })
    .then((participation) => {
      res.send(participation[0]);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};

// // Retrieve and return all participation details.
// exports.findContestPart = (req, res) => {
//     Participation.find({contestId: req.body.contestId})
//     .then(participation => {
//         res.send(participation);
//     }).catch(err => {
//         res.status(500).send({
//             success: false,
//             message: err.message || "Some error occurred while retrieving participation."
//         });
//     });
// };

exports.findUserPart = (result, callback) => {
  Participation.find({ participationId: result.participationId })
    .then((participation) => {
      if (!participation) {
        return callback("Couldn't find participation", null);
      }
      return callback(null, participation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return callback("Couldn't find participation, caught exception", null);
      }
      return callback("Error retrieving data", null);
    });
};
