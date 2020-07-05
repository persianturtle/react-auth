const mysql = require("mysql2/promise");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const SECRET = "super-strong-secret";
const ORIGIN = "http://localhost";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/auth/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).redirect(302, "/login");
});

/**
 * Every route below this authentication middleware must:
 *
 *  - be a HTTP POST request
 *  - must have a "Content-Type" header set to "application/json"
 *  - must have a "Origin" and/or "Referer" header set to our origin
 */
app.use((req, res, next) => {
  if (req.header("Content-Type") !== "application/json") {
    return res.status(403).send();
  }

  if (!(req.header("Origin") === ORIGIN || req.header("Referer") === ORIGIN)) {
    return res.status(403).send();
  }

  next();
});

/**
 * Verify the JWT for all requests and set the `req.isAuthenticated` state
 */
app.use((req, res, next) => {
  const token = req.cookies.token;

  try {
    const { isAuthenticated } = jwt.verify(token, SECRET);
    req.isAuthenticated = isAuthenticated;
  } catch (err) {
    req.isAuthenticated = false;
  }

  next();
});

app.post("/auth/check", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated });
});

app.post("/auth/login", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "db",
    user: "user",
    password: "pass",
    database: "crm",
  });

  const [
    [user],
  ] = await connection.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [
    req.body.email,
  ]);

  try {
    if (await argon2.verify(user.password, req.body.password)) {
      const token = jwt.sign({ isAuthenticated: true }, SECRET, {
        expiresIn: req.body.stayLoggedIn ? "7 days" : "1h",
      });
      return res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        })
        .json(true);
    }

    res.json(false);
  } catch (err) {
    res.json(false);
  }
});

app.post("/auth/register", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "db",
    user: "user",
    password: "pass",
    database: "crm",
  });

  try {
    await connection.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [req.body.email, await argon2.hash(req.body.password)]
    );

    res.send(201).send();
  } catch (err) {
    res.send(409).send();
  }
});

app.listen(80, () => console.log("API server running..."));
