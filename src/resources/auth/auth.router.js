const authService = require('./auth.service');
const Auth = require('./auth.model');
const userService = require('../users/user.service');

const router = require('express').Router();

router.post('/login', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await userService.getByLoginAndPassword({
      login,
      password
    });
    if (!user) {
      res.sendStatus(403);
      return;
    }
    const { id } = user;
    const auth = await authService.create({
      userId: id,
      login
    });

    res.json(Auth.toResponse(auth));
    return;
  } catch (e) {
    next(e);
    return;
  }
});

module.exports = router;
