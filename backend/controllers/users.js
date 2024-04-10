const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const { isValidUser, isValidPassword } = require("../utils/validators");

const SALT_ROUNDS = 10;

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !isValidUser(username)) {
    return response.status(400).json({ error: "invalid username" });
  }

  if (!name || !isValidUser(name)) {
    return response.status(400).json({ error: "invalid name" });
  }

  if (!password || !isValidPassword(password)) {
    return response.status(400).json({ error: "invalid password" });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
