import React from "react";
import Table from "../components/Table/Table.js";

export default function BattingCard(props) {
  return(
    <Table
      tableHeaderColor="gray"
      tableHead={['Batsman','R','B','4s', '6s', 'SR']}
      tableData={[props.strikerScore, props.nonStrikeScore]}
    />
  )
}