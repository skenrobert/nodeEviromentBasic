const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    //res.send('note add');
   res.render('./notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
    //console.log(req.body);
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    //console.log(newNote);
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
//    res.send('new note');
};

notesCtrl.renderNotes = async (req, res) => {
    //res.send('render notes');
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('notes/all-notes',{notes} );
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    //console.log(note);
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', {note});
    //res.send('Edit notes');

};

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description} );
    console.log(req.body);
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
   // res.send('Update note');
};

notesCtrl.deleteNote = async (req, res) => {
   // console.log(req.params.id);

   await Note.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Note Deleted Successfully');
   res.redirect('/notes');
    //res.send('Delete note');
    

};

module.exports = notesCtrl;