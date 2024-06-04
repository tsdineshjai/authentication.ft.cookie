import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/db.js";

//creates a modular router handlers and middlewars specific to this route,and its mountable
const router = express.Router();

const signUpValidaton = z.object({
	email: z.string().email(),
	password: z.string().min(6, { message: "minimum six characters in length" }),
});

router.post("/signup", async (req, res) => {
	const validatedSignUpdetails = signUpValidaton.safeParse(req.body);

	//validation
	if (!validatedSignUpdetails.success) {
		res.status(400).json({
			message: "invalid schema",
		});
	}

	const data = validatedSignUpdetails.data;

	//create a hashedPassword
	const hashedPassword = await bcrypt.hash(data.password, 10);

	//once validation is fine and hashedPassword is created creata a user
	try {
		const user = await prisma.user.create({
			data: {
				email: data?.email,
				password: hashedPassword,
			},
		});
		res.status(200).json({
			message: `user is created succesfully with the id ${user.id}`,
			details: user,
		});
	} catch (e) {
		res.status(404).json({
			message: "action is invalid due to the error: `${e.message}`",
		});
	}
});

const loginValidaton = z.object({
	email: z.string().email(),
	password: z.string(),
});

router.post("/login", async (req, res) => {
	//input validation using zod
	//generate a jwt token and send via res.cookie

	const validatedLoginDetails = loginValidaton.safeParse(req.body);

	if (!validatedLoginDetails.success) {
		res.status(400).json({
			message: "invalid credentials",
		});
	}

	//now check if the user exists in database

	const user = await prisma.user.findUnique({
		where: {
			email: validatedLoginDetails.data.email,
		},
	});

	if (!user) {
		res.status(404).json({
			messsage: "user not found",
		});
	}

	//now check if passwords match

	const isPassMatching = bcrypt.compareSync(
		validatedLoginDetails.data.password,
		user.password
	);

	if (!isPassMatching) {
		res.status(400).json({
			message: "invalid credentials",
		});
	}

	//if password is matching now the time to generate a jsonwebtoken and send it via cookie
	const jsontoken = jwt.sign({ id: user?.id }, String(process.env.SECRET_KEY));

	//setting a cookie value and this cookie will be sent to the user
	res.cookie("auth_token", jsontoken);

	res.status(200).json({
		message: "logged in Successfully",
		userId: `${user?.id}`,
	});
});

router.get("/userdetails", async (req, res) => {
	//the idea here is read the cookie and extract the token, once we get the token, we can get the payload(ie user.id) by verifying with jwt

	//once the id is obtained, we can get the user details from the database

	const token = req.cookies.auth_token;

	const payload = jwt.verify(token, String(process.env.SECRET_KEY));


	if (!payload) {
		res.status(404).json({
			messsage: "user not found",
		});
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: payload.id,
			},
		});
		res.status(200).json({
			email: user?.email,
			id: user?.id,
		});
	} catch (e) {
		res.status(404).json({
			message: "err has occured while fetching the user: `${e.message}`",
		});
	}
});

router.post("/logout", async (req, res) => {
	//clear the cookie removes the userinfo , so that authorization cannot be done if the user tries to do some reqeusts like posting a message

	try {
		res.clearCookie("auth_token");
		res.status(200).json({
			message: "successsfully logged out",
		});
	} catch (e) {
		res.status(404).json({
			message: "action couldnt be performed due to the error: `${e.message}`",
		});
	}
});

export default router;
