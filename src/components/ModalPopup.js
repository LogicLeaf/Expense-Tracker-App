import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import TransactionForm from './TransactionForm'
import { UserContext } from '../context/UserContext'
const ModalWrapper=styled.div`
position:fixed;
top:0;
left:0;
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
backdrop-filter:blur(0.5px);
opacity: ${props => (props.$show ? 1 : 0)};
pointer-events: ${props => (props.$show ? 'auto' : 'none')};
transition: transform 0.3s ease, opacity 0.3s ease;


`
const ModalBox=styled.div`
  display:flex;
  justify-content:center;
  align-content:flex-start;
  flex-direction:column;
  box-sizing:border-box;
  width: 30vw;
  min-width:350px;
  height: 50%;
  border: 1px solid #e5e5e5ff;
  border-radius: 15px;
  box-shadow: 0px 0px 8px #e5e5e5ff;
  background-color: white;
  padding:30px 40px;
  transform: scale(${props => (props.$show ? 1 : 0)});
  opacity: ${props => (props.$show ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media(max-width:600px)
  {
width: 80vw;
 min-width:150px;
  height: 50vh;
  }
`

export default function ModalPopup() {
 const{
  formOpen,
    setFormOpen,
  }=useContext(UserContext)
 
        const ModalQuit=()=>{   
          setFormOpen(!formOpen)
         
        }
        const ModelBoxFix=(e)=>{
           e.stopPropagation() 
          
         
         

        }
  return (
    <div>
        <ModalWrapper  $show={formOpen} onClick={ModalQuit}>
        <ModalBox      $show={formOpen} onClick={ModelBoxFix}>
        <TransactionForm />
                
                </ModalBox>
      </ModalWrapper>
    </div>
  )
}
