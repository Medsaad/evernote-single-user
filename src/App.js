import React from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'

const firebase = require('firebase');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: []
    };

    this.selectNote = this.selectNote.bind(this);
    this.noteUpdate = this.noteUpdate.bind(this);
    this.newNote = this.newNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

  }

  componentDidMount() {
    firebase.firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });

        this.setState({ notes });
      });
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ?
            <Editor
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}
            /> :
            null
        }
      </div>
    )
  }

  selectNote(note, index) {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  }

  noteUpdate(id, note) {
    firebase.firestore().collection('notes')
      .doc(id)
      .update({
        Title: note.title,
        Body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  async newNote(title) {
    const note = {
      title,
      body: '<p></p>'
    };

    const newFromDB = await firebase.firestore().collection('notes')
      .add({
        Title: note.title,
        Body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    const id = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, { ...note, id }] });

    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === id)[0]);

    await this.setState({ selectedNoteIndex: newNoteIndex, selectedNote: this.state.notes[newNoteIndex] });
  }

  async deleteNote(note) {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(_note => _note === note)})

    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({selectedNoteIndex: null, selecetedNote: null});
    }else{
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.notes[this.state.selectedNotIndex - 1]], this.state.selectedNotIndex - 1):
      this.setState({selectedNoteIndex: null, selecetedNote: null});
    }

    firebase.firestore().collection('notes').doc(note.id).delete();
  }
}

export default App;
