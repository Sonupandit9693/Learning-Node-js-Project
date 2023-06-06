const { error } = require("console");
const { createHmac, randomBytes } = require("crypto");
const { Schema, default: mongoose } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    ProfileImage: {
      type: String,
      default: "../public/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamp: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = "sonukumarpandit";
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (!user) throw new Error("user not found");

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvideHash = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  if (hashedPassword !== userProvideHash) throw new Error("Incorrect password");

  return { ...user, password: undefined, salt: undefined };
});

const User = mongoose.model("user", userSchema);

module.exports = User;
