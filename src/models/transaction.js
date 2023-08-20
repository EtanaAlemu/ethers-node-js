const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    isTokenTx: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    toAddress: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
    txnHash: {
      type: String,
      required: true,
      unique: true,
    },
    txnFee: {
      type: Number,
      required: true,
    },
    gasPrice: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["Transfer", "Deposit"],
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
  {
    timestamps: true,
  }
);
TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Transaction", TransactionSchema);
