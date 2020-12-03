import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import BattingCard from "../../Atom/BattingCard.js";
import SelectBox from "../../Atom/SelectBox.js";
import { observer, inject } from "mobx-react";

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
const wicketType = [
  { id: "Bold", name: "Bold" },
  { id: "Catch", name: "Catch" },
  { id: "Runout", name: "Runout" }
];

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

const WicketModal = inject("MatchScore")(
  observer(
    class WicketModal extends Component {
      constructor(props) {
        super(props);
      }
      handleClose = () => {
        this.props.closeModal();
      };
      saveWicketInfo = () => {
        this.props.MatchScore.wicketData.wicket_taker_id = this.props.MatchScore.bowler_id;
        this.props.MatchScore.strike_id = this.props.MatchScore.wicketData.next_batsman_id;
        this.props.closeModal();
      };

      render() {
        return (
          <div>
            <Dialog
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
              open={true}
              maxWidth="lg"
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={this.handleClose}
              >
                Wicket
              </DialogTitle>
              <DialogContent dividers>
                <BattingCard
                  strikerScore={this.props.batsmenScore}
                  nonStrikeScore={[]}
                />
                <SelectBox
                  values={wicketType}
                  defaultLabel={"Wicket Type"}
                  StoreName={"MatchScore"}
                  StoreAction={"update"}
                  inputName="wicket_type"
                  duplicateValue={[]}
                />
                <SelectBox
                  values={this.props.MatchScore.NextBatsMens}
                  defaultLabel={"Next Batsman"}
                  StoreName={"MatchScore"}
                  StoreAction={"update"}
                  inputName="next_batsman_id"
                  duplicateValue={this.props.playedBatesMen}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.saveWicketInfo()} color="primary">
                  Save changes
                </Button>
                <Button onClick={() => this.handleClose()} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
    }
  )
);

export default WicketModal;
