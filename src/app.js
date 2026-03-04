import express from 'express';
import defaultRouter from './routers/routes.js';
import session from "express-session";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "devsecret",
        resave: false,
        saveUninitialized: false
    })
);

app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
    } else {
        req.user = null;
    }
    next();
});

app.use("/", defaultRouter);

export default app;