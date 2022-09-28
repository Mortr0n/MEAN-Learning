const MongooseDashboardController = require('../controllers/mongooseDashboard.controller');

module.exports = (app) => {
    app.get('/', MongooseDashboardController.index);    
    app.get('/mongeese/new', MongooseDashboardController.newMongoose);    
    app.get('/mongeese/edit/:id', MongooseDashboardController.editOneMongoose);  
    app.get('/mongoose/:id', MongooseDashboardController.getOneMongoose);  
      
    app.post('/mongeese/:id', MongooseDashboardController.updateOneMongoose);      
    app.post('/mongeese/delete/:id', MongooseDashboardController.deleteOneMongoose);    
    app.post('/mongeese', MongooseDashboardController.createOneMongoose);
}