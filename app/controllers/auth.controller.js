const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    const verificationCode = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();

    // Testing ethereal email account. See https://ethereal.email
    // Name 	Brody Jacobs
    // Username 	brody48@ethereal.email (also works as a real inbound email address)
    // Password 	1bWqZCcVwKuZTdT7G4
    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'brody48@ethereal.email',
          pass: '1bWqZCcVwKuZTdT7G4'
      }
  });

    const message = {
      from: 'brody48@ethereal.email', // Sender address
      to: user.email,         // List of recipients
      subject: 'Your Auth Code', // Subject line
      text: `Your Auth Code is: ${verificationCode}` // Plain text body
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
          console.log(err)
      } else {
          console.log("Successfully send the email!");
      }
    });

    req.session.verificationCode = verificationCode;
    console.log("tokenset", req.session.verificationCode)

    
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.verify = (req, res) => {
  if (req.session.verificationCode == req.body.verificationCode) {
    return res.status(200).send({
      message: "Successfully logged in!",
    });
  } else {
    return res.status(401).send({
      message: "Invalid Verification Code!",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
