verifyValidSession = (req, res, next) => {
  const userid = req.session.userid;
  //console.log("loggedin session: ", userid, req.session)
  if (!userid) {
    // https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
    return res.status(401).send({
      message: "Sorry, we are not able to identify you. Either your session has expired or you have not logged in.",
      sessionInvalid: true
    });
  } else {
    next();
  }
};

module.exports = verifyValidSession;

