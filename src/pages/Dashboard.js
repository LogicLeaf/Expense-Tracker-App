import React from 'react'
import IncomeExpense from '../components/IncomeExpense'
import ExpenseData from '../components/ExpenseData'
import IncomeData from '../components/IncomeData'
import styled from 'styled-components'


const ContentArea=styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:100%;
height:100vh;

`
const DivOv=styled.div`
display:flex;
justify-content:space-between;
width:100%;
height:80%;
@media(max-width:600px){
flex-direction:column;
width:90vw;
}

`
const RecentTransaction=styled.div`
display:flex;
flex-direction:column;

background-color:white;
border-radius:15px;
margin-top:25px;
border:1px solid #f0f0f0ff;
padding:30px 15px 30px 15px;
width:48%;
height:100%;

@media(max-width:600px){
width:100%;
height:100%;
}
`

const Heading=styled.div`
margin-bottom:40px;
font-weight:600;
font-size:1rem;

`

const OverView=styled.div`
display:flex;
flex-direction:column;

background-color:white;
border-radius:15px;
margin-top:25px;
border:1px solid #f0f0f0ff;
padding:30px 15px 30px 15px;
width:48%;
height:100%;

@media(max-width:600px){
width:100%;
height:100%;
}
`
const Summary=styled.div`
width:100%;
@media(max-width:600px){
width:90vw;
}
`

export default function Dashboard() {
  return (
    <ContentArea>
    <Summary><IncomeExpense/></Summary>
        <DivOv>
        <RecentTransaction>
          <Heading>Recent Transactions</Heading>
            <IncomeData/>
            <ExpenseData/>
        </RecentTransaction>
        <OverView>
          <Heading>Overview</Heading>
        </OverView>
        </DivOv>
    </ContentArea>
  )
}

