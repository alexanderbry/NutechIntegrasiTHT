const { where } = require("sequelize");
const { Profile, Transaction, Services } = require("../../models");

class transactionService {
  static async getBalance(payload) {
    try {
      const id = payload;
      const balance = await Profile.findByPk(id, {
        attributes: ["balance"],
      });
      if (!balance) throw { name: "Not Found" };

      return {
        status: 200,
        message: "Sukses",
        data: balance,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async topupBalance(payload) {
    try {
      const { id, top_up_amount } = payload;

      const latestId = await Transaction.max("id");
      const invoice_number = `INV${new Date()
        .toLocaleDateString("en-GB")
        .replace(/\//g, "")}-${String(latestId + 1).padStart(3, "0")}`;

      await Transaction.create({
        invoice_number,
        transaction_type: "TOPUP",
        description: "Top Up balance",
        total_amount: top_up_amount,
        ServicesId: null,
        ProfileId: id,
      });

      const checkBalance = await Profile.findByPk(id, {
        attributes: ["balance"],
      });

      const newBalance = checkBalance.balance + top_up_amount;

      await Profile.update(
        {
          balance: newBalance,
        },
        {
          where: { id },
        }
      );

      const data = await Profile.findByPk(id, {
        attributes: ["balance"],
      });

      return {
        status: 200,
        message: "Top Up Balance berhasil",
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async payment(payload) {
    try {
      const { id, service_code } = payload;

      const service = await Services.findOne({
        where: { service_code },
      });
      if (!service) throw { name: "ServiceNotFound" };

      const price = service.service_tariff;

      const checkBalance = await Profile.findByPk(id, {
        attributes: ["balance"],
      });

      if (checkBalance.balance < price) throw { name: "BalanceNotEnough" };
      const newBalance = checkBalance.balance - price;

      const latestId = await Transaction.max("id");
      const invoice_number = `INV${new Date()
        .toLocaleDateString("en-GB")
        .replace(/\//g, "")}-${String(latestId + 1).padStart(3, "0")}`;

      const newTransaction = await Transaction.create({
        invoice_number,
        transaction_type: "PAYMENT",
        total_amount: price,
        ServicesId: service.id,
        ProfileId: id,
      });

      await Profile.update(
        {
          balance: newBalance,
        },
        {
          where: { id },
        }
      );

      const data = {
        invoice_number,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: "PAYMENT",
        total_amount: price,
        created_on: newTransaction.createdAt,
      };
      return {
        status: 200,
        message: "Transaksi berhasil",
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async getTransactionHistory(payload) {
    try {
      const { offset, limit } = payload;

      const transactions = await Transaction.findAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
        where: { ProfileId: payload.id },
      });

      return {
        status: 0,
        message: "Get History Berhasil",
        data: {
          offset,
          limit,
          records: transactions,
        },
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

module.exports = transactionService;
