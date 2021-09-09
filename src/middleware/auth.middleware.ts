export function authMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      auth: false,
      message: 'You have not been auth'
    });
  }
  next();
}