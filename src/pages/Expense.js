import React from 'react'
import ExpenseData from '../components/ExpenseData'
import styled from 'styled-components'

const ExpenseWrap=styled.div`
background-color:white;
flex:1;
padding:20px;
border-radius:7px;
border:1px solid #f0f0f0ff;
`
const ExpenseStyle=styled.div`
padding:20px; 
` 
export default function Expense({expense, setExpense,deleteExpense}) {

  return (
    <ExpenseWrap>
      <p style={{fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px'}}>Expenses</p>
      <ExpenseStyle><ExpenseData expense={expense} setExpense={setExpense} deleteExpense={deleteExpense}/></ExpenseStyle>
    </ExpenseWrap>
  )
}

