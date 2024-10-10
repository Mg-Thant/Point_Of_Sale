const Counter = require("../models/counter");

const getNextSequenceVal = async (sequenceName) => {
  const sequenceDoc = await Counter.findOneAndUpdate(
    { id: sequenceName },
    { $inc: { sequence_val: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDoc.sequence_val;
};

module.exports = getNextSequenceVal;
