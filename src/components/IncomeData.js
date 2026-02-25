import React from 'react'
import styled from 'styled-components'
import PopUp from './PopUp'
import {useState,useContext} from 'react'
import { UserContext } from '../context/UserContext'
const ItemsWrapper=styled.div`
display:flex;
align-items:center;
width:100%;
margin-bottom:30px;
background-color:blue;
@media(max-width:600px){
width:100%;
}
`

const Emoji=styled.div`
height:50px;
display:flex;
justify-content:center;
align-items:center;
font-size:1.5rem;
width:50px;
height:50px;
border-radius:50%;
background-color: #ecececff;

@media(max-width:600px){
font-size:1rem;
width:40px;
height:40px;
}
`

const EmojiWrap=styled.div`
width:70px;
height:70px;
display:flex;
align-items:center;
justify-content:center;
`
const Description=styled.div`
font-family: 'Poppins', sans-serif;
  font-weight: 500;   /* Medium */
  font-size: 16px;
  @media(max-width:600px){
font-size:0.8rem;
}
`
const Amount=styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
height:30px;
width:90px;
background-color: #e7fff1ff;
background-color:red;
border-radius:5px;
font-family: 'Poppins', sans-serif;
  font-weight: 700;   /* Bold */
  font-size: 13px;
  color: #26c867ff; 
  
   @media(max-width:600px){
font-size:0.6rem;
}
`
const Date=styled.div`
color: #858585ff;
font-family: 'Poppins', sans-serif;
  font-weight: 400;   /* Regular */
  font-size: 13px;
  color: #858585;     /* subtle gray */

  @media(max-width:600px){
font-size:0.7rem;
}
`

const DateDesWrapper=styled.div`
display:flex;
flex-direction: column; 
justify-content:space-evenly;
height:50px;
width:60%;
padding-left:20px;
background-color:red;
@media(max-width:600px){
padding-left:7px;
}

`
const DelIcon=styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-right:40px;
color: #7b7b7bff;
background-color:red;
width:20%;
&:hover{
color:black;
cursor:pointer;
transform: scale(1.07);
transition: all 0.3s ease;
}
 @media(max-width:600px){
 height:100%;
 width:20%;
font-size:0.8rem;
margin-right:20px;
}
`


export default function IncomeData() {
//  const deleteHandle=(index)=>{
//    setIncome(prev => prev.filter((_, i) => i !== index))
//    }
const{
  income, deleteIncome
}=useContext(UserContext)
const[submit,setsubmit]=useState(null)
const[ShowPopUp,setPopUp]=useState(false)
const[pendingId,setpendingId]=useState(false)

const popUpCheck=(id)=>{
  setpendingId(id)
setPopUp(true)
}
const delConfirm=()=>{
   if (pendingId) {
    deleteIncome(pendingId); // now actually delete
    setpendingId(null);
  }
}
    const list=income.map((item,index)=>{
        return <ItemsWrapper key={item.id}>
          {/* <ItemsWrapper key={index}>  */}
        <EmojiWrap><Emoji>{item.emoji}</Emoji></EmojiWrap>
        <DateDesWrapper>
          <Description>{item.description} </Description>
          <Date>{item.date}</Date>
        </DateDesWrapper>
        {/* <DelIcon><i onClick={() =>deleteHandle(index)} className="fa-solid fa-trash-can"></i></DelIcon> */}
         <DelIcon><i className="fa-solid fa-pen-to-square"></i><i onClick={() =>popUpCheck(item.id) } className="fa-solid fa-trash-can"></i></DelIcon>
          <Amount>+ {item.amount} rs{<i  className="fa-solid fa-chart-line"></i>}</Amount>
          </ItemsWrapper>
        
    })

  return (
    <div>
      <PopUp ShowPopUp={ShowPopUp} setPopUp={setPopUp} submit={submit} setsubmit={setsubmit} delConfirm={delConfirm} />
      {list}  
    </div>
  )
}


