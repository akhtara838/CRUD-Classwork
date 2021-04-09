const user = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(user => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user data: ${error.message}`)
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("/users/index");
    },
    new: (req, res) => {
        res.render("/users/new");
    },
    create: (req, res, next) => {
        let newUser = new User({
            name: {
                first:req.body.first,
                last:req.body.last
            },
            email:req.body.email,
            password:req.body.password,
            zipCode: req.body.zipCode
        });
        user.create(newUser)
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error savine user: ${error.message}`);
                next(error)
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();

    },
    show: (req, res, next) => {
        let userID = req.params.id;
        User.findById(userID)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
            })
    },
    showView: (req, res) => {
        res.render(users / show);
    },
    edit: (req, res, next) => {
        let userID = req.params.id;
        User.findById(userID)
            .then(User => {
                res.render("/users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error loading data by ID: ${error.message}`)
                next(error);
            })
    },
    update: (req, res, next) => {
        let userID = req.params.id;
        let updatedUser = new User({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        User.findByIdAndUpdate(userID, updatedUser)
            .then(user => {
                res.locals.user = user;
                res.local.redirect = `/users/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
                next(error);
            })
    },
    delete: (req, res, next) => {
        let userID = req.params.id;
        User.findByIdAndRemove(userID)
            .then(() => {
                res.locals.redirectView = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
            })
    }
}
