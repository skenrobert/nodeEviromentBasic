const { Router } = require('express');
const router = Router();

const { renderNoteForm,
     createNewNote, 
     renderNotes, 
     renderEditForm, 
     updateNote,
     deleteNote
    } = require('../controllers/notes.controllers');

const {isAuthenticated} = require('../helpers/auth');

// New note
router.get('/notes/add',isAuthenticated, renderNoteForm);

router.post('/notes/new-note',isAuthenticated, createNewNote);

//Get all note
router.get('/notes',isAuthenticated, renderNotes);

//Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
//router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

router.put("/notes/edit-note/:id",isAuthenticated, updateNote);
//router.put("/notes/edit-note/:id", isAuthenticated, updateNote);


//Delete Note
router.delete("/notes/delete/:id",isAuthenticated , deleteNote);

module.exports = router;