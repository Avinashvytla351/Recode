const Question = require("../models/question.model.js");
const inarray = require("inarray");
const xlsx = require("xlsx");
const contests = require("./contest.controller.js");
const participations = require("./participation.controller.js");
// const Base64 = require('js-base64').Base64;
// Create and Save a new question
exports.create = (req, res) => {
  // Validate request

  if (!req.body.questionName) {
    return res.status(400).send({
      success: false,
      message: "Question name can not be empty",
    });
  }

  Question.find()
    .then((questions) => {
      var currQuestions = questions[0].CountValue + 1;
      req.body.questionId = "IARE" + currQuestions.toString();
      Question.findOneAndUpdate(
        { questionId: questions[0].questionId },
        { $set: { CountValue: currQuestions } }
      )
        .then()
        .catch((err) => {
          res.status(500).send({
            success: false,
            message:
              err.message || "Some error occurred while retrieving questions.",
          });
        });
      // Create a Question
      const question = new Question({
        questionId: req.body.questionId,
        questionName: req.body.questionName,
        contestId: req.body.contestId,
        questionDescriptionText: req.body.questionDescriptionText,
        questionInputText: req.body.questionInputText,
        questionOutputText: req.body.questionOutputText,
        questionExampleInput1: req.body.questionExampleInput1,
        questionExampleOutput1: req.body.questionExampleOutput1,
        questionExampleInput2: req.body.questionExampleInput2,
        questionExampleOutput2: req.body.questionExampleOutput2,
        questionExampleInput3: req.body.questionExampleInput3,
        questionExampleOutput3: req.body.questionExampleOutput3,
        questionHiddenInput1: req.body.questionHiddenInput1,
        questionHiddenInput2: req.body.questionHiddenInput2,
        questionHiddenInput3: req.body.questionHiddenInput3,
        questionHiddenOutput1: req.body.questionHiddenOutput1,
        questionHiddenOutput2: req.body.questionHiddenOutput2,
        questionHiddenOutput3: req.body.questionHiddenOutput3,
        questionExplanation: req.body.questionExplanation,
        author: req.body.author,
        editorial: req.body.editorial,
        difficulty: req.body.difficulty,
      });

      // Save Question in the database
      question
        .save()
        .then((data) => {
          res.send({
            success: true,
            message: "Question Created Successfully ",
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message:
              err.message || "Some error occurred while creating the Question.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

exports.createExcel = (req, res) => {
  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = "../quesxlsx" + name;
    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.send("Error Occured!");
      } else {
        let wb = xlsx.readFile("../quesxlsx" + name);
        let ws = wb.Sheets["Sheet1"];
        let data = xlsx.utils.sheet_to_json(ws);
        let question;
        Question.find()
          .then((questions) => {
            let currQuestions = questions.length;
            for (let i = 0; i < data.length; i++) {
              question = new Question({
                questionId: "Recode" + (currQuestions + (i + 1)).toString(),
                questionName: data[i].questionName,
                contestId: data[i].contestId,
                questionDescriptionText: data[i].questionDescriptionText,
                questionInputText: data[i].questionInputText,
                questionOutputText: data[i].questionOutputText,
                questionExampleInput1: data[i].questionExampleInput1,
                questionExampleOutput1: data[i].questionExampleOutput1,
                questionExampleInput2: data[i].questionExampleInput2,
                questionExampleOutput2: data[i].questionExampleOutput2,
                questionExampleInput3: data[i].questionExampleInput3,
                questionExampleOutput3: data[i].questionExampleOutput3,
                questionHiddenInput1: data[i].questionHiddenInput1,
                questionHiddenInput2: data[i].questionHiddenInput2,
                questionHiddenInput3: data[i].questionHiddenInput3,
                questionHiddenOutput1: data[i].questionHiddenOutput1,
                questionHiddenOutput2: data[i].questionHiddenOutput2,
                questionHiddenOutput3: data[i].questionHiddenOutput3,
                questionExplanation: data[i].questionExplanation,
                author: data[i].author,
                editorial: data[i].editorial,
                difficulty: data[i].level,
              });

              // Save Question in the database
              question.save();
            }
            res.send({
              success: true,
              message: "Done! Uploaded files",
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message:
                err.message ||
                "Some error occurred while retrieving questions.",
            });
          });
      }
    });
  } else {
    res.send({
      success: false,
      message: "No File selected !",
    });
    res.end();
  }
};

exports.createSet = (req, res) => {
  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = "../quesxlsx" + name;
    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.send("Error Occured!");
      } else {
        let wb = xlsx.readFile("../quesxlsx" + name);
        let ws = wb.Sheets["Sheet1"];
        let data = xlsx.utils.sheet_to_json(ws);
        let question;
        Question.find()
          .then((questions) => {
            let currQuestions = questions.length;
            for (let i = 0; i < data.length; i++) {
              question = new Question({
                questionId: "Recode" + (currQuestions + (i + 1)).toString(),
                questionName: data[i].questionName,
                contestId: req.params.contestId,
                questionDescriptionText: data[i].questionDescriptionText,
                questionInputText: data[i].questionInputText,
                questionOutputText: data[i].questionOutputText,
                questionExampleInput1: data[i].questionExampleInput1,
                questionExampleOutput1: data[i].questionExampleOutput1,
                questionExampleInput2: data[i].questionExampleInput2,
                questionExampleOutput2: data[i].questionExampleOutput2,
                questionExampleInput3: data[i].questionExampleInput3,
                questionExampleOutput3: data[i].questionExampleOutput3,
                questionHiddenInput1: data[i].questionHiddenInput1,
                questionHiddenInput2: data[i].questionHiddenInput2,
                questionHiddenInput3: data[i].questionHiddenInput3,
                questionHiddenOutput1: data[i].questionHiddenOutput1,
                questionHiddenOutput2: data[i].questionHiddenOutput2,
                questionHiddenOutput3: data[i].questionHiddenOutput3,
                questionExplanation: data[i].questionExplanation,
                author: data[i].author,
                editorial: data[i].editorial,
                difficulty: data[i].level,
              });

              // Save Question in the database
              question.save();
            }

            contests.findOneSet(req, (err, contest) => {
              if (err) {
                res.send({ success: false, message: "Error occured" });
              }
              let sets = contest.sets;
              let initialLength = questions.length;
              let finalLength = initialLength + data.length;
              let set = [];
              let i,
                j = 0;
              for (i = initialLength + 1; i <= finalLength; i++) {
                set[j++] = "IARE" + i.toString();
              }
              if (contest.sets) {
                sets.push(set);
              }
              contests.updateOneSet(req, sets, (err, contest1) => {
                if (err) {
                  res.send({ success: false, message: "Error occured" });
                }
              });
            });

            res.send({
              success: true,
              message: "Done! Uploaded files",
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message:
                err.message ||
                "Some error occurred while retrieving questions.",
            });
          });
      }
    });
  } else {
    res.send({
      success: false,
      message: "No File selected !",
    });
    res.end();
  }
};

exports.addSetGivenQIdArray = (req, res) => {
  let questionIdString = req.body.questionIdsString;

  let pattern = /[^A-Z&a-z&0-9]/;
  let questionIds = questionIdString
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.match(pattern) === null);

  Question.find({ questionId: { $in: questionIds } })
    .then((question) => {
      if (question.length === 0) {
        return res.status(400).send({
          success: false,
          message: "Question id does not exists!",
        });
      }
      Question.updateMany(
        { questionId: { $in: questionIds } },
        {
          $set: {
            contestId: req.body.contestId,
          },
        }
      )
        .then((questions) => {
          let set = question.map((e) => e.questionId);
          updateSet(set);
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message:
              err.message || "Some error occurred while retrieving questions.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });

  const updateSet = (set) => {
    contests.findOneSet(req, (err, contest) => {
      if (err) {
        res.send({ success: false, message: "Error occured" });
      }
      let sets = contest.sets || [];
      if (contest.sets) {
        sets.push(set);
      }
      contests.updateOneSet(req, sets, (err, contest1) => {
        if (err) {
          res.send({ success: false, message: "Error occured" });
        }
        res.send({
          success: true,
          message: "Done! Added to Set",
        });
      });
    });
  };
};

exports.createTutorials = (req, res) => {
  // Validate request
  if (!req.body.questionName) {
    return res.status(400).send({
      success: false,
      message: "Question name can not be empty",
    });
  }

  Question.find()
    .then((questions) => {
      let companies = [];
      let topics = [];
      if (req.body.companies) {
        companies = req.body.companies
          .split(",")
          .filter((item) => !item.includes("-"))
          .map((item) => item.trim());
      }
      if (req.body.topics) {
        topics = req.body.topics
          .split(",")
          .filter((item) => !item.includes("-"))
          .map((item) => item.trim());
      }

      var currQuestions = questions[0].CountValue + 1;
      req.body.questionId = "IARE" + currQuestions.toString();
      Question.findOneAndUpdate(
        { questionId: questions[0].questionId },
        { $set: { CountValue: currQuestions } }
      )
        .then()
        .catch((err) => {
          res.status(500).send({
            success: false,
            message:
              err.message || "Some error occurred while retrieving questions.",
          });
        });
      req.body.questionId = "Recode" + currQuestions.toString();

      // Create a Question
      const question = new Question({
        questionId: req.body.questionId,
        questionName: req.body.questionName,
        contestId: req.body.contestId,
        questionDescriptionText: req.body.questionDescriptionText,
        questionInputText: req.body.questionInputText,
        questionOutputText: req.body.questionOutputText,
        questionExampleInput1: req.body.questionExampleInput1,
        questionExampleOutput1: req.body.questionExampleOutput1,
        questionExampleInput2: req.body.questionExampleInput2,
        questionExampleOutput2: req.body.questionExampleOutput2,
        questionExampleInput3: req.body.questionExampleInput3,
        questionExampleOutput3: req.body.questionExampleOutput3,
        questionHiddenInput1: req.body.questionHiddenInput1,
        questionHiddenInput2: req.body.questionHiddenInput2,
        questionHiddenInput3: req.body.questionHiddenInput3,
        questionHiddenOutput1: req.body.questionHiddenOutput1,
        questionHiddenOutput2: req.body.questionHiddenOutput2,
        questionHiddenOutput3: req.body.questionHiddenOutput3,
        questionExplanation: req.body.questionExplanation,
        company: companies,
        topic: topics,
        difficulty: req.body.difficulty,
        author: req.body.author,
        editorial: req.body.editorial,
        courseId: "practice",
      });

      // Save Question in the database
      question
        .save()
        .then((data) => {
          res.send({
            success: true,
            message: "Question created successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message:
              err.message || "Some error occurred while creating the Question.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

exports.createTutorialsExcel = (req, res) => {
  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = "../quesxlsx" + name;
    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.send("Error Occured!");
      } else {
        let wb = xlsx.readFile("../quesxlsx" + name);
        let ws = wb.Sheets["Sheet1"];
        let data = xlsx.utils.sheet_to_json(ws);
        let question;
        Question.find()
          .then((questions) => {
            let currQuestions = questions.length;
            for (let i = 0; i < data.length; i++) {
              let isTopicBased =
                data[i].company || data[i].topic ? true : false;
              let companies = [];
              let topics = [];
              if (data[i].company) {
                companies = data[i].company
                  .split(",")
                  .filter((item) => !item.includes("-"))
                  .map((item) => item.trim());
              }
              if (data[i].topic) {
                topics = data[i].topic
                  .split(",")
                  .filter((item) => !item.includes("-"))
                  .map((item) => item.trim());
              }

              question = new Question({
                questionId: "Recode" + (currQuestions + (i + 1)).toString(),
                questionName: data[i].questionName,
                contestId: data[i].contestId,
                questionDescriptionText: data[i].questionDescriptionText,
                questionInputText: data[i].questionInputText,
                questionOutputText: data[i].questionOutputText,
                questionExampleInput1: data[i].questionExampleInput1,
                questionExampleOutput1: data[i].questionExampleOutput1,
                questionExampleInput2: data[i].questionExampleInput2,
                questionExampleOutput2: data[i].questionExampleOutput2,
                questionExampleInput3: data[i].questionExampleInput3,
                questionExampleOutput3: data[i].questionExampleOutput3,
                questionHiddenInput1: data[i].questionHiddenInput1,
                questionHiddenInput2: data[i].questionHiddenInput2,
                questionHiddenInput3: data[i].questionHiddenInput3,
                questionHiddenOutput1: data[i].questionHiddenOutput1,
                questionHiddenOutput2: data[i].questionHiddenOutput2,
                questionHiddenOutput3: data[i].questionHiddenOutput3,
                questionExplanation: data[i].questionExplanation,
                company: companies,
                topic: topics,
                difficulty: data[i].level,
                author: data[i].author,
                editorial: data[i].editorial,
                courseId: "practice",
              });
              // Save Question in the database
              question.save();
            }
            res.send({
              success: true,
              message: "Done! Uploaded files",
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message:
                err.message ||
                "Some error occurred while retrieving questions.",
            });
          });
      }
    });
  } else {
    res.send({
      success: false,
      message: "No File selected !",
    });
    res.end();
  }
};

// Retrieve and return all questions from the database.
exports.findAll = (req, res) => {
  Question.find()
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

// Find a single question with a questionId
exports.findOne = (req, res) => {
  Question.find({ questionId: req.params.questionId })
    .then((question) => {
      if (!question) {
        return res.status(404).send({
          success: false,
          message: "Question not found with id " + req.params.questionId,
        });
      }
      res.send(question);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Question not found with id " + req.params.questionId,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error retrieving question with id " + req.params.questionId,
      });
    });
};

exports.getQuestionName = (req, res) => {
  Question.find({ questionId: req.params.questionId })
    .then((question) => {
      if (!question) {
        return res.status(404).send({
          success: false,
          message: "Question not found with id " + req.params.questionId,
        });
      }
      let response = {
        questionName: question[0].questionName,
      };
      res.send(response);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Question not found with id " + req.params.questionId,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error retrieving question with id " + req.params.questionId,
      });
    });
};
// Find testcases with questionId
exports.getTestCases = (req, callback) => {
  Question.find({ questionId: req.body.questionId })
    .then((question) => {
      if (!question) {
        return callback("Couldn't find question", null);
      }
      question = question[0];
      // let h1 = question.questionHiddenInput1.toString();
      // console.log("h1");
      // console.log(h1);
      // h2 = Base64.encode(h1);
      testcases = {
        contestId: question.contestId,
        HI1: question.questionHiddenInput1,
        HI2: question.questionHiddenInput2,
        HI3: question.questionHiddenInput3,
        HO1: question.questionHiddenOutput1,
        HO2: question.questionHiddenOutput2,
        HO3: question.questionHiddenOutput3,
        difficulty: question.difficulty,
        language: question.language,
        courseId: question.courseId,
      };
      return callback(null, testcases);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return callback("Couldn't find question, caught exception", null);
      }
      return callback("Error retrieving data", null);
    });
};

// Update a question identified by the questionId in the request
exports.update = (req, res) => {
  if (!req.body.questionId) {
    return res.status(400).send({
      success: false,
      message: "content can not be empty",
    });
  }

  let username = req.decoded.username;
  let qid = req.body.questionId;
  let userArr = ["admin"];
  qid = qid.slice(0, 3);
  userSlice = username.slice(7);
  userSlice = userSlice.toUpperCase();
  if (req.decoded.admin) {
    qid = "admin";
    username = "admin";
    userSlice = "admin";
  }
  if (!userArr.includes(username) || qid != userSlice) {
    return res.status(400).send({
      success: false,
      message: "Unauthorized access!",
    });
  }
  // Find question and update it with the request body
  Question.findOneAndUpdate(
    { questionId: req.params.questionId },
    {
      $set: {
        questionId: req.body.questionId,
        questionName: req.body.questionName,
        contestId: req.body.contestId,
        questionDescriptionText: req.body.questionDescriptionText,
        questionInputText: req.body.questionInputText,
        questionOutputText: req.body.questionOutputText,
        questionExampleInput1: req.body.questionExampleInput1,
        questionExampleOutput1: req.body.questionExampleOutput1,
        questionExampleInput2: req.body.questionExampleInput2,
        questionExampleOutput2: req.body.questionExampleOutput2,
        questionExampleInput3: req.body.questionExampleInput3,
        questionExampleOutput3: req.body.questionExampleOutput3,
        questionHiddenInput1: req.body.questionHiddenInput1,
        questionHiddenInput2: req.body.questionHiddenInput2,
        questionHiddenInput3: req.body.questionHiddenInput3,
        questionHiddenOutput1: req.body.questionHiddenOutput1,
        questionHiddenOutput2: req.body.questionHiddenOutput2,
        questionHiddenOutput3: req.body.questionHiddenOutput3,
        questionExplanation: req.body.questionExplanation,
        author: req.body.author,
        editorial: req.body.editorial,
        difficulty: req.body.difficulty,
      },
    },
    { new: true }
  )
    .then((question) => {
      if (!question) {
        return res.status(404).send({
          success: false,
          message: "Question not found with id " + req.params.questionId,
        });
      }
      res.send("Updated Successfully, Go Back");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Question not found with id " + req.params.questionId,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating Question with id " + req.params.questionId,
      });
    });
};

// Delete a question with the specified questionId in the request
exports.delete = (req, res) => {
  Question.findOneAndRemove({ questionId: req.params.questionId })
    .then((question) => {
      if (!question) {
        return res.status(404).send({
          success: false,
          message: "question not found with id " + req.params.questionId,
        });
      }
      res.send({ message: "question deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "question not found with id " + req.params.questionId,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete question with id " + req.params.questionId,
      });
    });
};

// Delete questions with the specified questionIds in the request
exports.deleteMultiple = (req, res) => {
  questionIds = req.params.questionIds
    .split(",")
    .filter((item) => !item.includes("-"))
    .map((item) => item.trim());
  Question.deleteMany({ questionId: { $in: questionIds } })
    .then((question) => {
      if (!question) {
        return res.status(404).send({
          success: false,
          message: "question not found with id " + req.params.questionId,
        });
      }
      res.send({ message: "questions deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "question not found with id " + req.params.questionId,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete question with id " + req.params.questionId,
      });
    });
};

exports.findAllContest = async (req, res) => {
  contests.findOneSet(req, async (err, contest) => {
    if (err) {
      res.send({ success: false, message: "Error occured" });
    }

    if (contest.multiset === true) {
      participations.findParticipation(req, async (err, participation) => {
        if (err) {
          return res.send({ success: false, message: err || "Error occured" });
        }

        if (participation.questions.length !== 0) {
          const result = await findSet(participation.questions);
          return result;
        }

        let sets = contest.sets;
        let questionIds = [];
        let index, i;
        for (i = 0; i < contest.sets.length; i++) {
          let index = Math.floor(Math.random() * sets[i].length);
          questionIds[i] = sets[i][index];
        }

        participations.updateParticipation(
          req,
          questionIds,
          async (err, participation) => {
            if (err) {
              return res.send({
                success: false,
                message: err || "Error occured",
              });
            }
            let result = await findSet(questionIds);
            return result;
          }
        );
      });
    } else {
      const result = await findContest();
      return result;
    }
  });

  const findSet = async (questionIdArray) => {
    return Question.find({ questionId: { $in: questionIdArray } })
      .then(async (question) => {
        if (!question) {
          return res.status(404).send({
            success: false,
            message: "Question not found with id " + req.params.contestId,
          });
        }
        res.send(question);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Question not found with id " + req.params.contestId,
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error retrieving question with id " + req.params.contestId,
        });
      });
  };

  const findContest = async () => {
    return Question.find({ contestId: req.params.contestId })
      .then((question) => {
        if (!question) {
          return res.status(404).send({
            success: false,
            message: "Question not found with id " + req.params.contestId,
          });
        }
        res.send(question);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Question not found with id " + req.params.contestId,
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error retrieving question with id " + req.params.contestId,
        });
      });
  };
};

exports.findPracticeNames = async (req, res) => {
  Question.find({ courseId: "practice" })
    .then((questions) => {
      res.send({
        success: true,
        data: questions,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Failed to retrive questions",
      });
    });
};

exports.findPracticeByTitle = async (req, res) => {
  if (req.params.division == "Topics") {
    Question.find({ topic: req.params.title })
      .then((questions) => {
        res.send({ success: true, data: questions });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Failed to retrive questions",
        });
      });
  } else {
    Question.find({ company: req.params.title })
      .then((questions) => {
        res.send({ success: true, data: questions });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Failed to retrive questions",
        });
      });
  }
};
