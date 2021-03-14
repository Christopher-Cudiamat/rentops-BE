const JWT = require("jsonwebtoken");
const config = require("config");

const signToken = (user) => {
  return JWT.sign(
    {
      iss: "Rentops",
      data: user,
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    config.get("jwtSecret")
  );
};

module.exports = {
  postSignIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        "local.email": email,
        "local.password": password,
      }).select("-local.password -__v -method");

      if (!user) res.status(422).json({ error: "Invalid credentials" });

      const token = signToken(user);
      res.status(200).json({
        token,
        email,
        isAuthenticated: true,
        firstName: user.local.firstName,
        lastName: user.local.lastName,
        likes: user.local.likes,
      });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
};
