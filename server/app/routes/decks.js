var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/', /*helper.isAdmin,*/ function(req, res){
        db.getDecks(function(err, decks){
            return helper.handleResponse(res, err, decks);
        });
    });

    router.get('/:id/cards', /*helper.isLoggedIn,*/ function(req, res){
        db.getCards(req.params.id, function(err, cards){
            return helper.handleResponse(res, err, cards);
        });
    });

    router.post('/', /*helper.isAdmin,*/ function(req, res){
        db.createDeck(req.body, function(err, result){
            var data = {
                rows: result ? result.affectedRows : 0, 
                id: result ? result.insertId : -1 };
            return helper.handleResponse(res, err, data);
        });
    });

    router.put('/:id', /*helper.isAdmin,*/ function(req, res){
        db.updateDeck(req.body, function(err, result){
            return helper.handleResponse(res, err, {rows: result ? result.affectedRows : 0 ,message: 'Updated'});
        });
    });

    router.delete('/:id', /*helper.isAdmin,*/ function(req, res){
        db.deleteDeck(req.params.id, function(err, result){
            return helper.handleResponse(res, err, 'Deleted');
        });
    });

    return router;
}