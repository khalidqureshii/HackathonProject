// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import router from "./router/auth-router.js";
// import {connectDB} from "./utils/db.js"
// import errorMiddleware from "./middlewares/error-middleware.js";
// import cors from "cors";

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", router);
// app.use(errorMiddleware);

// connectDB().then( () => {
//     app.listen(PORT, ()=> {
//         console.log(`Server is running at Port ${PORT}`);
//     })
// });

// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import router from "./router/auth-router.js"; // Keep this for authentication routes
// import { connectDB } from "./utils/db.js";
// import errorMiddleware from "./middlewares/error-middleware.js";
// import cors from "cors";
// import multer from "multer"; // Import multer
// import Post from "./models/Post.js"; // Adjust the path as necessary

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Multer configuration for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Change this path as needed
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Unique filename
//   },
// });
// const upload = multer({ storage });

// // Define your routes
// app.use("/api/auth", router); // Authentication routes

// // New endpoint for creating a post
// app.post('/api/posts', upload.single('image'), async (req, res) => {
//     try {
//       const { title, description } = req.body;
//       const image = req.file ? req.file.path : null; // Get uploaded image path
//       const isDonation = req.body.donation === 'true'; // Parse checkbox state

//       // Create a new post in the database
//       const newPost = new Post({ title, description, image, isDonation });
//       await newPost.save(); // Save the post to the database

//       res.status(201).json({
//         message: 'Post created successfully!',
//         data: newPost, // Return the created post data
//       });
//     } catch (error) {
//       console.error('Error creating post:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

// // Error handling middleware
// app.use(errorMiddleware);

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running at Port ${PORT}`);
//   });
// });

// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import router from "./router/auth-router.js"; // Keep this for authentication routes
// import { connectDB } from "./utils/db.js";
// import errorMiddleware from "./middlewares/error-middleware.js";
// import cors from "cors";
// import multer from "multer"; // Import multer
// import Post from "./models/post-model.js"; // Adjust the path as necessary
// import path from "path"; // Required for static path

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files (uploaded images)
// // Serve the uploaded files statically

// app.use('/uploads', express.static('uploads'));
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Multer configuration for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Destination folder for uploads
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Unique filename
//   },
// });

// // File type validation for images (optional, but recommended)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true); // Accept image file
//   } else {
//     cb(new Error('Only images are allowed'), false); // Reject non-image file
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter, // Use the file filter
//   limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
// });

// // Define your routes
// app.use("/api/auth", router); // Authentication routes

// // New endpoint for creating a post
// app.post('/api/posts', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const image = req.file ? req.file.filename : null; // Save only the filename

//     const isDonation = req.body.donation === 'true'; // Parse checkbox state

//     // Create a new post in the database
//     const newPost = new Post({
//       title,
//       description,
//       image, // Only store the image filename, not full path
//       isDonation
//     });
//     await newPost.save(); // Save the post to the database

//     res.status(201).json({
//       message: 'Post created successfully!',
//       data: newPost, // Return the created post data
//     });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Fetch all posts
// app.get('/api/posts', async (req, res) => {
//     try {
//       const posts = await Post.find(); // Fetch all posts from MongoDB
//       res.status(200).json(posts);     // Return the posts in JSON format
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

// // Error handling middleware
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
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/profile", profile_Router);
app.use("/api/auth", router);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});
