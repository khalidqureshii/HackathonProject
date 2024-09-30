import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema( {
//     username: {
//         type:String,
//         require:true
//     },
//     phone: {
//         type:String,
//         require:true
//     },
//     email: {
//         type:String,
//         require:true
//     },
//     password: {
//         type:String,
//         require:true
//     },
// });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  industry: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  interests: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    required: true,
  },
  incoming: [
    {
      type: String,
      default: [],
    },
  ],
  connections: [
    {
      type: String,
      default: [],
    },
  ],
  education: [
    {
      university: {
        type: String,
        default: null,
      },
      course: {
        type: String,
        default: null,
      },
      startYear: {
        type: String,
        default: null,
      },
      endYear: {
        type: String,
        default: null,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        default: null,
      },
      role: {
        type: String,
        default: null,
      },
      type: {
        type: String,
        default: null,
      },
      startYear: {
        type: String,
        default: null,
      },
      endYear: {
        type: String,
        default: null,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const curr = this;
  if (!curr.isModified("password")) {
    next();
  }
  curr.password = await hashPassword(curr.password);
});

userSchema.methods.checkPassword = async function (enteredPass) {
  const isCorrect = bcrypt.compareSync(enteredPass, this.password);
  return isCorrect;
};

userSchema.methods.generateToken = async function () {
  try {
    return await jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_GENERATING_STRING,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

async function hashPassword(input_password) {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    return await bcrypt.hash(input_password, saltRounds);
  } catch (error) {
    next(error);
  }
}

const User = mongoose.model("User", userSchema);
export default User;
