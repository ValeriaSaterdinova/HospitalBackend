const User = require('../../db/models/user/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

createToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, secret, { expiresIn: '24' });
};

module.exports.createNewUser = async (req, res) => {
  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')); {
    try {
      const { login, password } = req.body;
      const candidate = await User.findOne({ login });
      if (candidate) {
        return res.status(422).send('A user with this name exists');
      } else {
        const hashPassword = bcrypt.hashSync(password, 8);
        const user = new User({ login, password: hashPassword });
        await user.save().then(result => res.status(200).send('User is registered'));
      }
    } catch (error) {
      console.log(error);
      res.status(422).send('Incorrect parameters');
    }
  }
};

module.exports.createUserAuthorization = async (req, res) => {
  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')); {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(422).send('User is not found');
      } else {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          return res.status(422).send('Invalid password');
        } else {
          const token = createToken(user._id);
          return res.status(200).send({ token });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(422).send('Incorrect parameters');
    }
  }
};
