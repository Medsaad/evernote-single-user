import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItem extends Component {

    constructor(){
        super();
        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }
    render() {
        const { _note, _index, classes, selectedNoteIndex } = this.props;
        const excerpt = _note.Body? removeHTMLTags(_note.Body.substring(0, 30)) : '';
        return (
            <div key={_index}>
                <ListItem
                    className={classes.ListItem}
                    selected={selectedNoteIndex === _index}
                    >
                    <div
                        className={classes.textSection}
                        onClick={() => this.selectNote(_note, _index)}>
                        <ListItemText
                            primary={_note.Title}
                            secondary={excerpt + '...'}>
                        </ListItemText>
                    </div>
                    <DeleteIcon onClick={() => this.deleteNote(_note)} className={classes.deleteIcon}></DeleteIcon>
                </ListItem>
            </div>
        )
    }

    selectNote(n, i) {
        this.props.selectNote(n, i);
    }

    deleteNote(n) {
        if(window.confirm(`Are you sure you want to delete ${n.Title}`)){
            this.props.deleteNote(n);
        }
    }
}

export default withStyles(styles)(SidebarItem);