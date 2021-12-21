const User = require('../../db/models/user/user');
const Reception = require('../../db/reception/reception');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const createToken = (id) => {
  const payload = {
    id
  };
  return jwt.sign(payload, secret, { expiresIn: '24' });
};

// User controller 
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
        const token = createToken(user._id);
        await user.save().then(result => { res.status(200).send({ data: 'User is registered', token }) });
      }
    } catch (error) {
      console.log(error);
      res.status(422).send('Incorrect parameters');
    }
  }
};

module.exports.userAuthorization = async (req, res) => {
  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')); {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(404).send('User is not found');
      } else {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          return res.status(404).send('Invalid password');
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

// Reception controller 

module.exports.getAllReceptions = (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(404).send('User is not registered');
  } else {
    const decoded = jwt.verify(token, secret)
    Reception.find({ userId: decoded.id }).then(result => {
      res.send({ data: result });
    }).catch(err => {
      res.status(422).send('Incorrect parameters');
    });
  }
};

module.exports.createNewReception = (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(404).send('User is not registered');
  } else {
    if (
      req.body.hasOwnProperty('name') &&
      req.body.hasOwnProperty('doctor') &&
      req.body.hasOwnProperty('data') &&
      req.body.hasOwnProperty('complaint')
    ) {
      req.body.userId = decoded.id;
      const reception = new Reception(req.body);
      reception.save().then(result => {
        res.send({ data: result });
      }).catch(err => {
        res.status(422).send('Incorrect parameters');
      });
    } else {
      res.status(422).send('Incorrect parameters');
    };
  };
};

module.exports.changeReceptionInfo = (req, res) => {
  if (req.body.hasOwnProperty('_id') &&
    (req.body.hasOwnProperty('name') ||
      req.body.hasOwnProperty('doctor') ||
      req.body.hasOwnProperty('data') ||
      req.body.hasOwnProperty('complaint'))
  ) {
    Reception.updateOne({ _id: req.body._id }, req.body).then(result => {
      Reception.find({ _id: req.body._id }).then(result => {
        res.send({ data: result });
      }).catch(err => {
        res.status(422).send('Incorrect parameters');
      });
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};

module.exports.deleteReception = (req, res) => {
  if (req.query.hasOwnProperty('_id')) {
    Reception.deleteOne({ _id: req.query._id }).then(result => {
      res.send('Reception deleted');
    });
  } else {
    res.status(404).send('Incorrect parameters');
  };
};