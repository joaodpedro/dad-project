var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/', /*helper.isAdmin,*/ function(req, res){
        db.getDecks(function(err, decks){
            return helper.handleResponse(res, err, decks);
        });
    });

    router.get('/:id/cards', /*helper.isAdmin,*/ function(req, res){
        db.getCards(req.params.id, function(err, cards){
            return helper.handleResponse(res, err, cards);
        });
    });

    return router;
}