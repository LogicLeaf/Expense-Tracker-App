import React from 'react'
import styled from 'styled-components'

const OuterDiv=styled.div`
display:flex;
width:100%;
justify-content:space-between;

@media(max-width:600px)
{
width:90vw;
flex-direction:column;

}

`
const Wraper=styled.div`
display:flex;
justify-content:center;
align-items:center;
width:30%;
height:90px;
border:1px solid #f0f0f0ff;
border-radius:10px;
padding-left:20px;
background-color:white;
@media(max-width:600px)
{
margin-bottom:12px;
width:100%;
}
`

const TextWrap=styled.div`
width:60%;
padding-right:10px;
`

const IconCircle=styled.div`
display:flex;
justify-content:center;
align-items:center;
width:60px;
height:60px;
border-radius:50%;
background: ${props=>props.$bgColor};

@media(max-width:700px)
{
width:50px;
height:50px;
}
`

const TextP=styled.p`
font-weight:500;
font-size:1rem;
color:grey;

@media(max-width:950px)
{
font-size:0.8rem;
}
`

const ResultNum=styled.div`
font-weight:500;
font-size:0.9rem;
`

const IconDiv=styled.div`
width:40%;
`
export default function IncomeExpense({income, expense}) {

const incomeTotal=income?.reduce((accumulator,arrayItem)=>{
  const stringToNum=Number(arrayItem.amount)
  return accumulator+stringToNum
}, 0) || 0;

const totalExpense=expense?.reduce((accumulator,arrayItem)=>{
  const stringToNum=Number(arrayItem.amount)
  return accumulator+stringToNum
},0) || 0;
  return (
    <div>
      
      <OuterDiv>
        <Wraper>
         <IconDiv><IconCircle $bgColor="#5b1ec5ff"><i style={{fontSize:"1.7rem", color:"white"}} className="fa-solid fa-money-check-dollar"></i></IconCircle></IconDiv>
        <TextWrap><TextP>balance</TextP><ResultNum>{incomeTotal-totalExpense} rs</ResultNum> </TextWrap>
        </Wraper>
       
        <Wraper>
         <IconDiv><IconCircle $bgColor="#1e6e6dff"><i style={{fontSize:"1.7rem", color:"white"}} className="fa-regular fa-credit-card"></i></IconCircle></IconDiv>
        <TextWrap><TextP>Total income</TextP><ResultNum>{incomeTotal} rs</ResultNum></TextWrap>
        </Wraper>
        

        <Wraper>
        <IconDiv><IconCircle $bgColor="#8d225fff"><i style={{fontSize:"1.7rem", color:"white"}} className="fa-solid fa-money-bill-trend-up"></i></IconCircle></IconDiv> 
         <TextWrap><TextP>Total expense</TextP> <ResultNum>{totalExpense} rs</ResultNum></TextWrap>
        </Wraper>
       
      </OuterDiv>
      
    </div>
  )
}
