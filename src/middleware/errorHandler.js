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
    case "TokenExpiredError":
    case "JsonWebTokenError":
      statusCode = 401;
      status = 108;
      message = "Token tidak tidak valid atau kadaluwarsa";
      break;
    case "FileRequired":
      statusCode = 400;
      status = 0;
      message = "Parameter profile_image tidak boleh kosong";
      break;
    case "InvalidType":
      statusCode = 401;
      status = 102;
      message = "Format Image tidak sesuai";
      break;
    case "InvalidEmail/Password":
      statusCode = 401;
      status = 103;
      message = "Email atau password salah";
      break;
    case "ServiceNotFound":
      statusCode = 400;
      status = 0;
      message = "Service ataus Layanan tidak ditemukan";
      break;
    case "BalanceNotEnough":
      statusCode = 400;
      status = 0;
      message = "Saldo anda tidak cukup, silahkan top up saldo anda";
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