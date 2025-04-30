// backend/models/JuryAssignment.js
const mongoose = require("mongoose");

const juryAssignmentSchema = new mongoose.Schema({
  juryId: { type: mongoose.Schema.Types.ObjectId, ref: "JuryMember", required: true },
  jobPostingId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPosting", required: true },
});

const JuryAssignment = mongoose.model("JuryAssignment", juryAssignmentSchema);
module.exports = JuryAssignment;