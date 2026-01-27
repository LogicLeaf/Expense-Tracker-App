import React from 'react'
import styled from 'styled-components';
const Loading=styled.div`
width:100px;
height:100px;
border:5px solid #d3d3d3ff;
border-right:5px solid #888888ff;
border-radius:50%;
animation: spin 1s linear infinite;
@keyframes spin{
from{
transform:rotate(0deg);
}
to{
transform:rotate(360deg);
}
}

`
const OutDiv=styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
width:100vw;
`
export default function Loader() {
  return (
    <div>
      <OutDiv><Loading /></OutDiv>
    </div>
  )
}
