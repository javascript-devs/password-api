const generatePassword = require("./generator");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  if (
    Object.keys(req.query).length !== 4 ||
    req.query.uppercase === undefined ||
    req.query.symbol === undefined ||
    req.query.len === undefined
  ) {
    res.status(400).json({ Message: "Wrong query", status: "400 Bad Request" });
  } else {
    const uppercase = req.query.uppercase === "true" ? true : false;
    const symbol = req.query.symbol === "true" ? true : false;
    const numbers = req.query.numbers === "true" ? true : false;
    const len = parseInt(req.query.len);
    if (
      numbers &&
      uppercase &&
      symbol &&
      parseInt(req.query.len) !== NaN &&
      parseInt(req.query.len) >= 8 &&
      parseInt(req.query.len) <= 100
    ) {
      res.status(200).json({
        Message: "Request Succesfull",
        status: "200",
        password: generatePassword(uppercase, symbol, numbers, len),
      });
    } else {
      if (parseInt(req.query.len) < 8 || parseInt(req.query.len) > 100) {
        res.status(400).json({
          Message:
            "Lenght of the password should be between 8 and 100 digits (inclusive)",
          status: "400 Bad Request",
        });
      } else {
        res
          .status(400)
          .json({ Message: "Wrong query", status: "400 Bad Request" });
      }
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
