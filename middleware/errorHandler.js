const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let status = 0;
  let message = "Internal Server Error";
  let data = null;

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      status = 0;
      message = err.errors[0].message;
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      status = 108;
      message = "Token tidak tidak valid atau kadaluwarsa";
      break;
    case "lastNameRequired":
      statusCode = 400;
      status = 0;
      message = "Parameter last_name tidak boleh kosong";
      break;
    case "InvalidEmail/Password":
      statusCode = 401;
      status = 103;
      message = "Email atau password salah";
      break;
    case "Not Found":
      statusCode = 404;
      status = 0;
      message = "Data not found";
      break;
    case "Unauthorized":
      statusCode = 401;
      status = 108;
      message = "Token tidak tidak valid atau kadaluwarsa";
      break;
    default:
      console.error(err);
      break;
  }
  res.status(statusCode).json({ status, message, data });
};

module.exports = errorHandler;