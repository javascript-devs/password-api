const express = require("express");
const app = express();
const gen = require("./generator");
const { query, validationResult } = require("express-validator");
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "docs/site_docs.html"));
});

app.get(
  "/pwd",

  query("uppercase")
    .exists()
    .withMessage("uppercase query required")
    .isIn(["true", "false"])
    .withMessage("Inavlid value passed"),
  query("numbers")
    .exists()
    .withMessage("numbers query required")
    .isIn(["true", "false"])
    .withMessage("Inavlid value passed"),
  query("symbol")
    .exists()
    .withMessage("symbol query required")
    .isIn(["true", "false"])
    .withMessage("Invalid value passed"),
  query("len")
    .exists()
    .withMessage("len query required")
    .isInt({ min: 8, max: 100 })
    .withMessage("len should be an integer in range 8-100"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    } else {
      if (Object.keys(req.query).length !== 4) {
        res.status(400).json({
          Message: "Extra queries Detected",
          status: "400 Bad request",
        });
      } else {
        var uppercase = req.query.uppercase === "true" ? true : false;
        var symbol = req.query.symbol === "true" ? true : false;
        var numbers = req.query.numbers === "true" ? true : false;
        var len = req.query.len;
        var pwd = gen(uppercase, symbol, numbers, len);
        res
          .status(200)
          .json({ Message: "Request Successfull", status: "200", result: pwd });
      }
    }
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
