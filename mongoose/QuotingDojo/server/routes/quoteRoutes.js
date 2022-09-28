const QuotesController = require('../controllers/quotesController');

module.exports = (app) => {
    app.get('/', QuotesController.index );
    app.get('/quotes', QuotesController.viewQuotesDesc);    
    app.post('/newQuote', QuotesController.createQuote);
}