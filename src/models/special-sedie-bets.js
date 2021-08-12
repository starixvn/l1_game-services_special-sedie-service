import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    phien: { type: Number, required: true, index: true },

    choice: { type: String, required: true },
    amount: { type: Number, required: true },

    thanhtoan: { type: Boolean, default: false },
    refund: { type: Number, default: 0 },
    win: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    memberId: { type: Number },
    siteId: { type: String },
});

Schema.index({ uid: 1, phien: 1 }, { background: true });

const SpecialSeDieBets = mongoose.model("SpecialSeDie_one", Schema);
const SpecialSeDieBetLogs = mongoose.model("SpecialSeDie_cuoc", Schema);

export { SpecialSeDieBets, SpecialSeDieBetLogs };
