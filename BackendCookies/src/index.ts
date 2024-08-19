import express, { Request, Response } from "express";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const JWT_SECRET = "test123";

// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true
}));
app.use((req: Request, res: Response, next: () => void) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    next()
})
// Routes
app.post("/signin", (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Assuming user validation happens here and user ID is retrieved from the database
    if (email == "test@gmail.com" && password == "test@123") {

        const userId = 1; // Example user ID

        const token = jwt.sign(
            { id: userId, email: email }, JWT_SECRET);
        res.cookie("token", token,);
        // res.cookie("token", token, { httpOnly: true });

        res.send({ msg: "Logged in!" });
    }
    else {
        res.cookie("token", "", { expires: new Date(0) }); // Expire the cookie
        res.status(401).send({ msg: "Invalid email or password" });
    }
});

app.get("/check-auth", (req: Request, res: Response) => {
    console.log(req.cookies, "Inside user ");

    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        // Get user details from the database using decoded.id
        // res.send({ userId: decoded.id });
        res.status(200).json({ authenticated: true });

    } catch (error) {
        res.status(401).json({ authenticated: false });
    }
});

app.post("/logout", (req: Request, res: Response) => {
    res.cookie("token", "", { expires: new Date(0) }); // Expire the cookie
    res.json({ message: "Logged out!" });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
