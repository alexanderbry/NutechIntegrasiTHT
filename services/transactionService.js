const { Profile, Transaction } = require("../models");

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
}

module.exports = transactionService;
