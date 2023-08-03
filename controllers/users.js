const User = require('../models/users');
const Profile = require('../models/profiles');

// CRUD controllers

//get all users

exports.getUsers = (req, res, next) => {
    const role = req.query.role;

    if (role === 'admin' || role === 'user') {
        console.log('haha here')
        User.findAll({ include: Profile, where: { role } })
          .then((users) => {
            res.status(200).json(users);
          })
          .catch((err) => {
            next(err);
          });
        return;
    }
    console.log('and also here')
    User.findAll({ include: Profile })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        next(err);
      });
}

//get user by id

exports.getUserById = (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => next(err));
}

//create user

exports.createUser = async (req, res, next) => {
    try {
        const { username, email, role, firstName, lastName, state } = req.body;
        console.log(1)
        console.log(2)
        const user = await User.create({ username, email, role });
        console.log(3)

        const profile = await Profile.create({ firstName, lastName, state });
        console.log(4)
        user.profileId = profile.id;
        console.log(5)

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

//update user

exports.updateUser = (req, res, next) => {
    const { username, email, role, firstName, lastName, state } = req.body;
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username;
        user.email = email;
        user.role = role;
        user.firstName = firstName;
        user.lastName = lastName;
        user.state = state;
        return user.save()

    }).then(user => {
        console.log(user)
        res.status(200).json({ message: 'User updated', user });
    }).catch(err => next(err));
}

//delete user

exports.deleteUser = (req, res, next) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return User.destroy({ where: { id: req.params.id } })
    }).then(() => {
        res.status(200).json({ message: 'User deleted' });
    }).catch(err => next(err));
}