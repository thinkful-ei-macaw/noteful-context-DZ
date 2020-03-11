import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import UserContext from '../UserContext'
import {findNote} from '../notes-helpers'


export default class NotePageMain extends React.Component {
  
  static contextType = UserContext;
  static defaultProps = {
    match: {
      params: {}
    }
  }
  notePageDelete = id => {
    console.log('I freakin work')
    this.props.history.push(`/`)
  }
  render () {
    const {notes, folders} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId);
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        notePageDelete={this.notePageDelete}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
  }
}
