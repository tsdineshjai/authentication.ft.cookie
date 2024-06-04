import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config"; //process.env now has the keys and values you defined in your .env file:
import userRoute from "./routes/auth-route.js";

//middlware

const app = express();
/* the below middleware parses the icoming body json into an object and assigns it to the req.body */
app.use(express.json());

/* allows cross origin requests and with credentials set to true,it will send cookies, authentication and ssl certificates */
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);
/* parses the cookie and make its better for handling the cookies */
app.use(cookieParser());

app.use("/user", userRoute);

app.get("/", (req, res) => {
	res.json({
		message: "you are accessing  the home page of the root router",
	});
});

app.listen(3000, () => {
	console.log(`app is up and running now`);
});
