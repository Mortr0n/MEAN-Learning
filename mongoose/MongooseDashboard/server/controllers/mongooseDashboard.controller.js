const mongoose = require('mongoose');
const MongooseDashboard = require('../models/mongooseDashboard.model');

module.exports = {
    index: (req, res) => {
        MongooseDashboard.find()
            .then(data => res.render("index", {mongeese: data}))
            .catch(err => res.removeListener(err));
    },

    newMongoose: (req, res) => {
        res.render("newMongoose");
    },

    editOneMongoose: (req, res) => {
        MongooseDashboard.find({_id: req.params.id})
            .then((foundMongoose) => {
                console.log(foundMongoose);
                res.render("editMongoose", {mongoose: foundMongoose[0] });
            })
            .catch((err) => {
                console.log(err)
            })
    },

    updateOneMongoose: (req, res) => {
        MongooseDashboard.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then((editedMongoose) => {
                console.log(editedMongoose);
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err)
            })
    },

    getOneMongoose: (req, res) => {
        MongooseDashboard.findById({_id: req.params.id})
            .then((mongoose) => {
                console.log("mongoose ", mongoose);
                res.render("singleMongoose", {mongoose: mongoose})
            })
            .catch((err) => {
                console.log(err)
            })
    },

    deleteOneMongoose: (req, res) => {
        MongooseDashboard.findByIdAndDelete({_id: req.params.id})
            .then((deletedMongoose) => {
                console.log("deleted ", deletedMongoose);
                res.redirect('/');
            })
            .catch(err => console.log(err));
    },

    createOneMongoose: (req, res) => {
        const mongoose = new MongooseDashboard(req.body)
        mongoose.save()
            .then(newMongoose => {
                console.log("Mongoose Created : ", newMongoose);
                res.redirect('/');
            })
            .catch(err => {
                for(var key in err.errors) {
                    req.flash('mongooseErrors', err.errors[key].message);
                    res.redirect('/')
                }
            })
    },
}