import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        red1: { type: Boolean, required: true },
        red2: { type: Boolean, required: true },
        red3: { type: Boolean, required: true },
        red4: { type: Boolean, required: true },
    },
    { _id: false }
);

const settlementResultSchema = new mongoose.Schema(
    {
        odd: { type: Boolean, default: false },
        even: { type: Boolean, default: false },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: resultSchema,
    settlementResult: settlementResultSchema,
    time: { type: Date, default: new Date() },
});

export const SpecialSeDieRounds = mongoose.model("SpecialSeDie_phien", Schema);
