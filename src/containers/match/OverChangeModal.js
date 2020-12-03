import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import SelectBox from "../../Atom/SelectBox.js";
import BowlingCard from "../../Atom/BowlingCard.js";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function OverChangeModal(props) {

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title">
          Over CHange
        </DialogTitle>
        <DialogContent dividers>
          <SelectBox values={props.NextBowlers}
            defaultLabel={"Select bowler"}
            StoreName={'MatchScore'}
            StoreAction={'nextBowler'}
            inputName='bowler_id'
            duplicateValue={[props.currentBowler]}
           />
          {props.nextBowlerCard &&
            <BowlingCard
              bowlingCard={props.nextBowlerCard}
            />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { props.closeModal()}} color="primary">
            Change Bowler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
