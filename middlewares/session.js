const loggedIn = (req, res, next) => {
  // const noLoginReq = ["/login", "/signup", "/"];
  // if (noLoginReq.includes(req.path) || req.session.user) {
  //   next();
  // } else {
  //   res.send(false);
  // }
  next()
};

module.exports = {
  loggedIn
};
