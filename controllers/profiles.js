const Profile = require('../models/profile');

module.exports = {
    getProfiles: (req, res, next) => {
        Profile.findAll()
            .then(profiles => {
                res.status(200).json(profiles);
            })
            .catch(err => next(err));
    },
    getOneProfile: (req, res, next) => {
        Profile.findByPk(req.params.id)
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({ message: 'Profile not found' });
                }
                res.status(200).json(profile);
            })
            .catch(err => next(err));
    },
    createProfile: (req, res, next) => {
        const { name, email, role, firstName, lastName, state } = req.body;
        Profile.create({name, email, role, firstName, lastName, state})
            .then(profile => {
                console.log('Created profile2: ', profile);
                res.status(201).json(profile);
            })
            .catch((err => next(err)));
    }
}