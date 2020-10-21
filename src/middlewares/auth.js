const jwt = require('jsonwebtoken');
const authService = require('../resources/auth/auth.service');

const authJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
      const { userId } = user;
      const auth = await authService.getSessionByUserId({
        userId
      });
      if (!auth) {
        return res.sendStatus(401);
      }
      if (auth.userId !== userId) {
        return res.sendStatus(401);
      }

      // eslint-disable-next-line require-atomic-updates
      req.user = user;
      return next();
    } catch (e) {
      throw new Error(e);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = authJWT;
