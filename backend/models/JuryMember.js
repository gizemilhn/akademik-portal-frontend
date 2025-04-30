const mongoose = require("mongoose");

const juryMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tc: { type: String, required: true, unique: true },
  email: { type: String },
  field: { type: String }, // örneğin Bilgisayar Müh., Psikoloji vb.
});

const JuryMember = mongoose.model("JuryMember", juryMemberSchema);
module.exports = JuryMember;
