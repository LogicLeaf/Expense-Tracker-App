import React from 'react'
import IncomeData from '../components/IncomeData'
import styled from 'styled-components'

export default function Income({income,setIncome, deleteIncome}) {
const IncomeWrap=styled.div`
background-color:white;
flex:1;
padding:20px;
border-radius:7px;
border:1px solid #f0f0f0ff;
`
const IncomeStyle=styled.div`
padding:20px;
`
  return (
    <IncomeWrap>
      <p style={{fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px'}}>Income sources</p>
      <IncomeStyle>
        <IncomeData income={income} setIncome={setIncome} deleteIncome={deleteIncome}/>
        </IncomeStyle>
    </IncomeWrap>
  )
}


  