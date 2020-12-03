import React from "react";
import Table from "../components/Table/Table.js";

export default function BowlingCard(props) {
  return(
    <Table
      tableHeaderColor="gray"
      tableHead={['Bowler','O','R','W', 'M', 'Eco']}
      tableData={[props.bowlingCard]}
    />
  )
}