import { Schema, model } from "mongoose";

interface CodeEntity {
    _id?: string;
    title: string;
    content: string;
    userRef: string;
    createdAt: Date;
    updatedAt: Date;
}

const codeSchema = new Schema({
    userRef: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Code = model<CodeEntity>("codes", codeSchema);