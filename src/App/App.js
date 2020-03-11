import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import {/*getNotesForFolder*/ findNote, findFolder} from '../notes-helpers';
import './App.css';
import UserContext from '../UserContext';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    fetchFolders = () => {
        fetch('http://localhost:9090/folders')
            .then(res => res.json())
            .then(data => this.setState({
                folders: data
            }));
    } 

    fetchNotes = () => {
        fetch('http://localhost:9090/notes')
            .then(res => res.json())
            .then(data => this.setState({
                notes: data
            }))
    }

    deleteNote = (id) => {
      const newNotes = this.state.notes.filter(note => note.id !== id);
      this.setState({
          notes: newNotes
      })
    }

    componentDidMount() {
        // // fake date loading from API call
        // setTimeout(() => this.setState(dummyStore), 600);
        this.fetchNotes()
        this.fetchFolders()
    }

    renderNavRoutes() {
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                // folders={folders}
                                // notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        // const {noteId} = routeProps.match.params;
                        // const note = findNote(notes, noteId) || {};
                        // const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        // const {notes} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        // component={NoteListMain}
                        render={routeProps => {
                        //     // const {folderId} = routeProps.match.params;
                        //     // const notesForFolder = getNotesForFolder(
                        //     //     notes,
                        //     //     folderId
                        //     // );
                            return (
                                <NoteListMain
                                    {...routeProps}
                        //             // notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        // const {noteId} = routeProps.match.params;
                        // const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps}/>;
                    }}
                />
            </>
        );
    }

    render() {
        
        return (
            <UserContext.Provider value={{
                folders: this.state.folders,
                notes: this.state.notes,
                deleteNote: (id) => this.deleteNote(id)
            }}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </UserContext.Provider>
        );
    }
}

export default App;
