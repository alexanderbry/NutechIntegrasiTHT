const { topupSchema, paymentSchema, getTransactionHistorySchema } = require("../schemas/transactionSchema");
const transactionService = require("../services/transactionService");

class transactionController {
  static async getBalance(req, res, next) {
    try {
      const { id } = req.user;
      const payload = id;

      const data = await transactionService.getBalance(payload);
      if (data.error) throw data.error;

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async topupBalance(req, res, next) {
    try {
      const { id } = req.user;
      const { error, value } = topupSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      const payload = {
        id,
        top_up_amount: value.top_up_amount,
      };

      const data = await transactionService.topupBalance(payload);
      if (data.error) throw data.error;

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async payment(req, res, next) {
    try {
      const { id } = req.user;
      const { error, value } = paymentSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      const payload = {
        id,
        service_code: value.service_code,
      };

      const data = await transactionService.payment(payload);
      if (data.error) throw data.error;

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      const { id } = req.user;
      const { error, value } = getTransactionHistorySchema.validate(req.query);

      if (error) {
        return res.status(401).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      const payload = {
        id,
        offset: value.offset,
        limit: value.limit,
      };

      const data = await transactionService.getTransactionHistory(payload);
      if (data.error) throw data.error;

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = transactionController;
