const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://dinu1763:Kums1763@dinucluster.nfiiq.mongodb.net/?retryWrites=true&w=majority"
  );
};
