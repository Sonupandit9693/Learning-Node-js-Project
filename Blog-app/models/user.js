const { error } = require("console");
const { createHmac, randomBytes } = require("crypto");
const { Schema, default: mongoose } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

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

userSchema.static(
  "matchPasswordAndGenrateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    // console.log(user);
    if (!user) return console.log("user not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvideHash) throw console.error("Incorrect password");
    const token = createTokenForUser(user);
    return token;
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
