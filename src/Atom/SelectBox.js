import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { observer, inject } from "mobx-react";
import { styled } from '@material-ui/core/styles';
const CustomFormControl = styled(FormControl)({
  minWidth: 140,
  margin: 10
});


const SelectBox = inject("CreateMatch", "MatchScore")(observer(class SelectBox extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedValue: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, StoreName, StoreAction, inputName){
    let id = event.target.value
    let name = event.currentTarget.innerText
    this.setState({selectedValue: id})
    this.props[StoreName][StoreAction](id, inputName, name)
  }

  render() {

    return(
        <CustomFormControl>
          <InputLabel id="demo-simple-select-label">{this.props.defaultLabel}</InputLabel>
          <Select
            id="demo-simple-select"
            value={ this.state.selectedValue}
            onChange={(e) => {
              this.handleChange(e, this.props.StoreName, this.props.StoreAction, this.props.inputName)
            }}
          >
            {this.props.values.map(value => {
              if(this.props.duplicateValue.includes(value.id)) return null;
              return <MenuItem key={value.id} value={value.id}>
                {value.name}
              </MenuItem>
            })}
          </Select>
        </CustomFormControl>
    )
  }
}))


export default SelectBox;
