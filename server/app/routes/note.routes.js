module.exports = function(app) {

    var notes = require('../controllers/note.controller.js');


    // Create a new Note
    app.post('/notes', notes.create);
    app.post('/authenticate',notes.authenticate);
    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}
