import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import UserContext from '../UserContext'

export default class Note extends React.Component {

  static contextType = UserContext;

    noteDelete = (id) => {
      const {deleteNote} = this.context;
    fetch(`http://localhost:9090/notes/${id}`, {
      method:'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res =>{
      if (res.ok) {
        deleteNote(id);
        this.props.notePageDelete(id);
      }})
  }

 
  render() {

  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={e => {
        e.preventDefault()
        this.noteDelete(this.props.id)}}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )}
}
