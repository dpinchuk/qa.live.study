const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
      paymentDate: {
        type: Date,
        require: true,
      },
      paymentSumm: {
        type: Number,
        require: true,
      },
      paymentMonthPeriod: {
        type: Number,
        require: true,
      }
    },
    {
      timestamps: true,
    }
);

PaymentSchema.set("toJSON", {
  virtuals: true,
});

let Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;