import React from 'react'
import styled from 'styled-components'

const Buttons=styled.div`
display:flex;
justify-content:space-between;
width:100%;
background-color:re
}`

const CancelBtn=styled.div`
transition: all 0.3s ease;
display:flex;
justify-content:center;
button{
cursor:pointer;
width:90px;
color:white;
border:1px solid #e6e6e6ff;
padding:4px;
box-shadow:0px 0px 3px #e6e6e6ff;
border-radius:5px;
background-color: #a7a7a7ff;
@media(max-width:600px){
font-size:10px;
width:70px;
}
&:hover{
background-color: #888888ff;}
}


`
const DelBtn=styled.div`
transition: all 0.3s ease;
display:flex;
justify-content:center;
button{
cursor:pointer;
width:90px;
color:white;
border:1px solid #e6e6e6ff;
padding:4px;
box-shadow:0px 0px 3px #e6e6e6ff;
border-radius:5px;
background-color: #DC143C;
border-radius:5px;
@media(max-width:600px){
font-size:10px;
width:70px;
}
&:hover{
background-color: #9a132eff;
}
}
}`



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
z-index: 9999;

`
const ModalBox=styled.div`
  display:flex;
  justify-content:center;
  align-content:flex-start;
  flex-direction:column;
  box-sizing:border-box;
  width: 30vw;
  min-width:350px;
  height: 15%;
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
width: 70vw;
 min-width:150px;
  height: 10vh;
  border-radius: 10px;
  }
`

export default function Popup({ShowPopUp,setPopUp,setsubmit,delConfirm}) {
        const PopUpQuit=()=>{   
          setPopUp(!ShowPopUp)
        }
        const PopUpFix=(e)=>{
           e.stopPropagation() 
        }
        const cancelBtn=()=>{ 
            setsubmit("cancel")
        setPopUp(!ShowPopUp)
        }
        const delBtn=()=>{
            setsubmit("delete")
        setPopUp(!ShowPopUp)
        delConfirm()
                }
       
  return (
    <div>
        <ModalWrapper  $show={ShowPopUp} onClick={PopUpQuit}>
        <ModalBox      $show={ShowPopUp} onClick={PopUpFix}>
        <Buttons><CancelBtn><button type="button" onClick={cancelBtn}>Cancel</button></CancelBtn>
        <DelBtn><button onClick={delBtn}>delete</button></DelBtn></Buttons>
        </ModalBox>
      </ModalWrapper>
    </div>
  )
}
