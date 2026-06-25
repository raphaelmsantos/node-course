import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 30
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 1,
            maxlength: 100,
            lowercase: true
        }
    },
    {
        timestamps: true
    }    
);   

// before saving the passwoard we need to hash it
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.isPasswordCorrect = async function (this: IUser, password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model<IUser>("User", userSchema);
