import React from "react";
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import UndoIcon from '@material-ui/icons/Undo';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  powerHitting: {
   backgroundColor: '#4caf50',
   color: 'white'
  },
  strokeMaking: {
    backgroundColor: '#00acc1',
    color: 'white'
  },
  extras: {
    backgroundColor: '#999',
    color: 'white'
  },
}));



export default function ScoringCard(props) {
    const classes = useStyles();

  return(
    <React.Fragment>
      <div className={classes.root}>
        <Fab size='small' className={classes.powerHitting} onClick={() => { props.strikeRotation(7) } }>7</Fab>
        <Fab size='small' className={classes.powerHitting} onClick={() => { props.powerHitting(6) } }>6</Fab>
        <Fab size='small' className={classes.powerHitting} onClick={() => { props.strikeRotation(5) } }>5</Fab>
        <Fab size='small' className={classes.powerHitting} onClick={() => { props.powerHitting(4) } }>4</Fab>
        <Fab size='small' className={classes.strokeMaking} onClick={() => { props.strikeRotation(3) } }>3</Fab>
        <Fab size='small' className={classes.strokeMaking} onClick={() => { props.scoreUpdate(2) } }>2</Fab>
        <Fab size='small' className={classes.strokeMaking} onClick={() => { props.strikeRotation(1) } }>1</Fab>
        <Fab size='small' className={classes.strokeMaking} onClick={() => { props.scoreUpdate(0) } }>0</Fab>
        <Fab size='small' color="secondary" onClick={() => { props.handleWicket('W') } }>W</Fab>
        <Fab size='small' color="secondary">NB</Fab>
        <Fab size='small' className={classes.extras}>WD</Fab>
        <Fab size='small' className={classes.extras}>LB</Fab>
        <Fab size='small' className={classes.extras}>B</Fab>
        <Fab size='small' color="inherit" ><UndoIcon /></Fab>
        <Fab size='small' className={classes.extras}>...</Fab>
      </div>
    </React.Fragment>
  )
}