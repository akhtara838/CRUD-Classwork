const course = require("../models/course");

module.exports = {
    index: (req, res, next) => {
        Course.find()
            .then(course => {
                res.locals.courses = courses;
                next();
            })
            .catch(error => {
                console.log(`Error fetching course data: ${error.message}`)
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("/courses/index");
    },
    new: (req, res) => {
        res.render("/courses/new");
    },
    create: (req, res, next) => {
        let newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudents: req.body.maxStudents,
            cost: req.body.cost
        });
        course.create(newCourse)
            .then(course => {
                res.locals.course = course;
                res.locals.redirect = "/courses";
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
        let courseID = req.params.id;
        Course.findById(courseID)
            .then(course => {
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
            })
    },
    showView: (req, res) => {
        res.render(courses / show);
    },
    edit: (req, res, next) => {
        let courseID = req.params.id;
        Course.findById(courseID)
            .then(Course => {
                res.render("/courses/edit", { course: course });
            })
            .catch(error => {
                console.log(`Error loading data by ID: ${error.message}`)
                next(error);
            })
    },
    update: (req, res, next) => {
        let courseID = req.params.id;
        let updatedCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudents: req.body.maxStudents,
            cost: req.body.cost
        });
        Course.findByIdAndUpdate(courseID, updatedCourse)
            .then(course => {
                res.locals.course = course;
                res.local.redirect = `/courses/${course._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
                next(error);
            })
    },
    delete: (req, res, next) => {
        let courseID = req.params.id;
        Course.findByIdAndRemove(courseID)
            .then(() => {
                res.locals.redirectView = "/courses";
                next();
            })
            .catch(error => {
                console.log(`Error fetching data by ID: ${error.message}`)
            })
    }
}
