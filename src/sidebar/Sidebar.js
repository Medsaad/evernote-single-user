import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/SidebarItem';


class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null
        };

        this.newNoteBtnClick = this.newNoteBtnClick.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.newNote = this.newNote.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    render() {
        const { notes, classes, selectedNoteIndex } = this.props;
        notes.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
        
        return (
            <div className={classes.sidebarContainer}>
                <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
                    {
                        this.state.addingNote ? 'Cancel' : 'New Note'
                    }
                </Button>
                {
                    this.state.addingNote ?
                        <div>
                            <input type="text" className={classes.newNoteInput} placeholder="Enter Note Title" onKeyUp={(e) => this.updateTitle(e.target.value)} />
                            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>Submit Note</Button>
                        </div> :
                        null
                }
                <List>
                    {
                        notes.map((_note, _index) => {
                            return (
                                <div key={_index}>
                                    <SidebarItem
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}
                                    ></SidebarItem>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    newNoteBtnClick() {
        this.setState({ addingNote: !this.state.addingNote, title: null });
    }

    updateTitle(title) {
        this.setState({ title });
    }

    newNote() {
        this.props.newNote(this.state.title);
        this.setState({title: null, addingNote: false});
    }

    selectNote(n, i) {
        this.props.selectNote(n, i);
    }

    deleteNote(n) {
        this.props.deleteNote(n);
    }
}

export default withStyles(styles)(Sidebar);