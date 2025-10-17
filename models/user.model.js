import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email already in use"],
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    firstname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name must be at most 50 characters long"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        trim: true,
        maxLength: [50, "Lastname must be at most 50 characters long"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minLength: [8, "Password must be at least 8 characters long"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, { timestamps: true })


// pre.save hook to hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const bcrypt = await import("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model("User", userSchema);