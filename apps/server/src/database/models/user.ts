import { Schema, model } from "mongoose";

interface UserEntity {
    username: string;
    email: string;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});

export const User = model<UserEntity>("users", userSchema);