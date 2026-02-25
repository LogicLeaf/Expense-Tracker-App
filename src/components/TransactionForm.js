import React from 'react'
import EmojiPick from '../components/EmojiPick';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import {UserContext} from "../context/UserContext"
import { useContext } from 'react';
const FormStyle=styled.div`
width: 100%;
height:auto;
margin:10px 0px;
display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:column;

 input {
 transition: all 0.3s ease;
    width: 100%;
    padding: 8px;
    border: 1px solid #e0e0e0ff;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    &:focus {
      outline:1px solid #e0e0e0ff;
      box-shadow: 0 0 0 3px rgba(159, 159, 159, 0.2);
    }
     
`

const Buttons=styled.div`
display:flex;
justify-content:space-between;
width:100%;

button{
transition: all 0.3s ease;
display:flex;
justify-content:center;
cursor:pointer;
width:90px;
border:1px solid #e6e6e6ff;
padding:4px;
border-radius:5px;
box-shadow:0px 0px 3px #e6e6e6ff;
&:hover{
background-color: #ecececff}
}

`
const SelectStyle=styled.div`
display:flex;
align-items:center;
margin:15px 0px 25px;
justify-content:space-between;

select{
transition: all 0.3s ease;
padding: 8px;
width:70%;
border:1px solid #e0e0e0ff;
border-radius:8px;

&:focus{
      outline:1px solid #e0e0e0ff;
      box-shadow: 0 0 0 3px rgba(159, 159, 159, 0.2);}
}
}
option{
outline:1px solid #e0e0e0ff;}
`

export default function TransactionForm() {
const{
   formOpen,
    setFormOpen,
    amount,
    setAmount,
    description,
    setDescription,
    showPicker,
    setPicker,
    currEmoji,
    addIncome,
    addExpense,
    setEmoji
}=useContext(UserContext)
const cancelBtn=()=>{  
setFormOpen(!formOpen)
        }
        
const submitChange=async (e)=>{
  e.preventDefault()
  setDescription("")
  setAmount("")
  
const formData = new FormData(e.target)
const data = Object.fromEntries(formData.entries()) 

const transaction = {
    description: data.description,
    amount: Number(data.amount),
    emoji: data.emoji || currEmoji,
    date: data.date || new Date().toISOString().split("T")[0]
  };
    if(data.choice==="Income"){
      // setIncome((prev)=>[...prev,data])
      await addIncome(transaction);  // 🔥 send to Firestore
    }
    else{
      // setExpense((prev)=>[...prev,data])
      await addExpense(transaction); // 🔥 send to Firestore
    }
}

const changeAmount=(e)=>{
  setAmount(e.target.value)
}

const changeDescription=(e)=>{
  setDescription(e.target.value)
}

return (
    <div>
        <>
          <FormStyle>
          <EmojiPick  currEmoji={currEmoji} setEmoji={setEmoji}
            showPicker={showPicker} setPicker={setPicker}></EmojiPick>
          </FormStyle>
         
        <form onSubmit={submitChange}>
          <input type="text" readOnly name="emoji" value={currEmoji} style={{display:"none"}} />
        <FormStyle>
            <label htmlFor="description">Title</label> 
            <input type='text' value={description} onChange={changeDescription} placeholder='Add title' id="description" name="description"/>
        </FormStyle>

        <FormStyle>
        <label htmlFor="amount">amount</label>
          <input type='number' value={amount} onChange={changeAmount} placeholder='Add amount' id="amount" name="amount" required/>
        </FormStyle>

         <SelectStyle>
          <label htmlFor="select">Choice</label>
          <select name="choice" id="select">
          <option name="choice" id="Income" value="Income" defaultValue >Income</option>
          <option name="choice" id="Expense" value="Expense"  >Expense</option>
         </select>
         </SelectStyle>

        <Buttons>
          <button type="button" onClick={cancelBtn}>Cancel</button>
          <button type="submit">Submit</button>
        </Buttons>

        <input type="date" name="date" style={{display:"none"}}  defaultValue={new Date().toISOString().split("T")[0]} />
        </form>
        </>  
    </div>
  )

}

 