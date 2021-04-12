const Subscriber = require("../models/subscriber");

module.exports = {
    index: (req, res, next) => {
        Subscriber.find()
            .then(subscribers => {
                res.locals.subscribers = subscribers;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscriber data: ${error.message}`)
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: (req, res, next) => {
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        Subscriber.create(newSubscriber)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                res.locals.redirect = "/subscribers";
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
        let subscriberID = req.params.id;
        Subscriber.findById(subscriberID)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
                next(error);
            })
    },
    showView: (req, res) => {
        res.render("subscribers/show");
    },
    edit: (req, res, next) => {
        let subscriberID = req.params.id;
        Subscriber.findById(subscriberID)
            .then(subscriber => {
                res.render("subscribers/edit", { subscriber: subscriber });
            })
            .catch(error => {
                console.log(`Error loading data by ID: ${error.message}`)
                next(error);
            })
    },
    update: (req, res, next) => {
        let subscriberID = req.params.id;
        let updatedSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode,
            _id: subscriberID
        });
        Subscriber.findByIdAndUpdate(subscriberID, updatedSubscriber)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                res.local.redirect = `/subscribers/${subscriber._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
                next(error);
            })
    },
    delete: (req, res, next) => {
        let subscriberID = req.params.id;
        Subscriber.findByIdAndRemove(subscriberID)
            .then(() => {
                res.locals.redirectView = "/subscribers";
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
                next(error);
            })
    }
}
