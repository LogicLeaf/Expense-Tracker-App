import React from 'react'
import styled from 'styled-components'
import ModalPopup from './ModalPopup'
const OuterDiv=styled.div`
padding:0 20px;
width:100%;
background-color: #ffffffff;
height:60px;
border:1px solid #f0f0f0ff;
font-family: 'Poppins', sans-serif;
display:flex;
justify-content:space-between;
align-items:center;
`

const Heading=styled.h1`
font-family: 'Poppins', sans-serif;
font-weight:600;
font-size:1rem;

@media(max-width:800px){
font-size:0.8rem;
padding-right:60px;
}


`
const ShowModal=styled.div`
display:flex;
justify-content:center;
align-items:center;
height:30px;
width:100px;
border:1px solid #e4e4e4ff;
border-radius:5px;
cursor:pointer;
font-size:13px;
font-weight:500;
background-color: #5b1ec5ff;
transition: all 0.3s ease;

&:hover{
background-color: #8843ffff;}

@media(max-width:600px){
width:65px;
height:25px;
}
`
const Text=styled.div`
font-size:0.9rem;
color:white;

@media(max-width:600px){
font-size:0.5rem;
}
`

const Hamburger=styled.div`
font-size:1.2rem;
cursor:pointer;
transition:all 0.3s ease;
position:absolute;
top:5vw;
left:3vw;
z-index: 999;
@media(min-width:800px)
{
display:none;}
`

const Cross=styled.div`
font-size:1.2rem;
cursor:pointer;
transition:all 0.3s ease;
position:absolute;
top:5vw;
left:3vw;
z-index: 999;
@media(min-width:800px)
{
display:none;}
`


const IconManage=styled.div`
display:flex;
@media(min-width:800px){
display:none;
}
`
export default function NavBar({setMenu,menu,addIncome,addExpense,setFormOpen,formOpen,income,setIncome,expense,setExpense,amount,setAmount,description,setDescription}) {
  const showForm=()=>{
  setFormOpen(!formOpen)
}
const hamburgHandle=()=>{
setMenu(!menu)

}
  return (
    <div>
      <OuterDiv>
        <IconManage>{menu?(<Cross onClick={hamburgHandle}><i className="fa-solid fa-xmark"></i></Cross>):
        (<Hamburger onClick={hamburgHandle}>
          <i className="fa-solid fa-bars"></i>
        </Hamburger>)}</IconManage>
        
        
      <Heading>Expense tracker app</Heading>
      <ShowModal  onClick={showForm}><Text>Add Items</Text>
        <ModalPopup income={income} setIncome={setIncome}
         expense={expense} setExpense={setExpense} 
         description={description} setDescription={setDescription} 
         amount={amount} setAmount={setAmount}
         formOpen={formOpen} setFormOpen={setFormOpen}
         addIncome={addIncome}
         addExpense={addExpense}
        />
      </ShowModal>
      </OuterDiv>
       
    </div>
  )
}
