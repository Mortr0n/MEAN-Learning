const mongoose = require('mongoose');
const Quote = require('../models/quote')

module.exports = {
    index : (req, res) => {
        Quote.find()
            .then(data => res.render("index", {quotes: data}))
            .catch(err => res.json(err));
    },

    viewQuotesDesc: (req, res) => {
        let date = new Date();
        Quote.find().sort({createdAt: "desc"})        
            .then(data => res.render("quotes", {quotes: data}))
            .catch(err => res.json(err));
    },

    createQuote: (req, res) => {
        const quote = new Quote(req.body);
        quote.save()
            .then(newQuote => {
                console.log("Quote Created : ", newQuote);
                res.redirect('/');
            })
            .catch(err => {
                for(var key in err.errors) {
                    req.flash('quoteErrors', err.errors[key].message);
                }
                res.redirect('/');
            });
    },
}