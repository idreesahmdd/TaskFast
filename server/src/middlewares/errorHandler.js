function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ErrorNotFound") {
    res.status(404).json({
      message: "Error Not Found"
    });
  } else if (err.name === "InvalidEmail") {
    res.status(400).json({
      message: "Invalid Email."
    });
  } else if (err.name === "WrongPassword") {
    res.status(400).json({
      message: "Wrong Password."
    });
  } else if (err.name === "AlreadyExists") {
    res.status(400).json({
      message: "Already Exists"
    });
  } else if (err.name === "EmailAlreadyExists") {
    res.status(400).json({
      message: "Email Already Exists"
    });
  } else if (err.name === "Unauthenticated") {
    res.status(400).json({
      message: "Unauthenticated"
    });
  } else if (err.name === "JWTerror") {
    res.status(400).json({
      message: "JWT Error"
    });
  } else if (err.name === "Unauthorized") {
    res.status(401).json({
      message: "Unauthorized"
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports = errorHandler;
