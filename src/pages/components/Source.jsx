import React from 'react';
import { FaCircleInfo } from "react-icons/fa6";

function Source({SourceText, LinktoSource}) {
  return (
    <div style={{
                    color: "#3F413C", 
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center",
                    width: "100%",
                    columnGap: "5px"
                }}>
            <p><strong>Data Source: </strong></p>
            <p style={{textDecoration: "underline"}}><a href={LinktoSource}> {SourceText}</a></p>
            <FaCircleInfo /> 
            <p style={{ display: "none" }}>Learn more about this data</p>
    </div>
  )
}

export default Source