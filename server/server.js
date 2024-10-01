// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import { fileURLToPath } from "url";
// import router from "./router/auth-router.js";
// import { connectDB } from "./utils/db.js";
// import errorMiddleware from "./middlewares/error-middleware.js";
// import cors from "cors";
// import profile_Router from "./router/profile-router.js";
// import postRoutes from "./router/post-router.js";
// import path from "path";
// import filterRouter from "./router/filter-router.js"

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// app.use("/api/profile", profile_Router);
// app.use("/api/auth", router);
// app.use("/api/posts", postRoutes);
// app.use("/api/filter", filterRouter);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(errorMiddleware);

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running at Port ${PORT}`);
//   });
// });

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import router from "./router/auth-router.js";
import { connectDB } from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from "cors";
import profile_Router from "./router/profile-router.js";
import postRoutes from "./router/post-router.js";
import filterRouter from "./router/filter-router.js"
import path from "path";

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Q4qnhF49ndw69q6SH1ga8bMC7qEYy58PPF0FHd5h7lcEbvg5OfqhO3Qlqkvhpl8Sbn3b3RGGoBqkhC57u3ebLgy001TGVPs5t"
);

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/profile", profile_Router);
app.use("/api/auth", router);
app.use("/api/posts", postRoutes);
app.use("/api/filter", filterRouter);
app.use("/uploads", express.static(path.join(_dirname, "uploads")));
app.use(errorMiddleware);

app.post("/create-payment-intent", async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", 
      },
    });
    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});