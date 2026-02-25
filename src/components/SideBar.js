import React from 'react'
import styled from 'styled-components'
import { NavLink} from "react-router-dom";
import {useState, useEffect,useContext} from 'react'
import userIcon from '../Assets/user-solid.svg'
import { auth, db } from '../components/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {UserContext} from "../context/UserContext"
 

const SideBarWrap=styled.div`
 width:20%;
  height:auto;
  display:flex;
  flex-direction: column;
  align-items:center;
  border:1px solid #f0f0f0ff;
  background-color: #ffffffff; 


@media(max-width: 800px)
{
transform:translateX(${props=>(props.$menu ? '0':'-100%' )});
transition:transform 0.5s ease;
position:absolute;
top:0;
left:0;
width:60vw;
height:100vh;


 }

  `
const DashStyle=styled.div`
display:flex;
flex-direction: column;
 align-items:center;
 width:100%;
`

  const DashButton=styled(NavLink)`
  display:flex;
 justify-content: flex-start;
 align-items:center;
 transition: all 0.3s ease;
 cursor: pointer;
 border-radius:10px;
  height:50px;
   width:90%;
   font-size:16px;
   padding-left:16px;
   i{
   padding-right:30px;
   }
   margin-top:10px;
   margin-bottom:10px;
  &:hover {
    background: #5b1ec5ff;
    color: white;
    border-radius:10px;
    i{
    color:white;}
    
  }
    &.active{
    background: #5b1ec5ff;
    color:white;
    border-radius:10px;
    box-shadow:0px 0px 3px #c5c5c5ff;
    i{
    color:white;}
    }
    &.active:hover {
    background: #8843ffff; /* different hover color for active */
    color: white;
    
  }
  `
const ProfilePic=styled.div`
height:200px;
width:100%;
display:flex;
flex-direction: column;
justify-content:space-evenly;
align-items:center;



  `
const DpWrapper=styled.div`
height:100px;
width:100px;
cursor:pointer;
border-radius:50%;
background-size:cover;
background-position:center;
background-repeat:no-repeat;
background-color: #f2f2f2ff;
transition: all 0.4s ease;
&:hover{
background-color: rgba(176, 176, 176, 0.5);
}
`
const NameChange=styled.div`
display:flex;
align-items:center;
justify-content:center;
font-family: 'Poppins', sans-serif;
font-weight: 500;   /* Medium */
font-size: 15px;
width:80%;
height:20px;

input{
 width: auto;   
height:20px;
outline:2px solid #afafafff;
border-radius:3px;
text-align: center;   /* centers text inside input */
    padding: 4px;}

`
const EditIcon=styled.div`
display:flex;
align-items:center;
justify-content: center;
i{
cursor:pointer;

}
width:10%;
height:20px;
`
const NameWrap=styled.div`
display:flex;
align-items:center;
justify-content: center;
width: 90%;
padding-right:15px;
`
const LogOut=styled.div`
   display:flex;
 justify-content: flex-start;
 align-items:center;
 
 cursor: pointer;
  height:50px;
   width:90%;
   font-size:16px;
   padding-left:16px;
   i{
   padding-right:30px;
   }
   margin-top:10px;
   margin-bottom:10px;
  &:hover {
    background: #5b1ec5ff;
    color: white;
    border-radius:10px;
    i{
    color:white;}
    
  }
    &.active{
    background: #5b1ec5ff;
    color:white;
    border-radius:10px;
    box-shadow:0px 0px 3px #c5c5c5ff;
    i{
    color:white;}
    }
    &.active:hover {
    background: #8843ffff; /* different hover color for active */
    color: white;
  }
`
export default function SideBar() {
  const{
    menu,
    handleLogout
  }=useContext(UserContext)
const[currPic,newPic]=useState(userIcon)
const[nameClick,clickUpdate]=useState()
const[name, setName]=useState("Change name")

//firebase starts here
const storage = getStorage()

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!auth.currentUser) return
      const docRef = doc(db, "users", auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.name) setName(data.name)
        if (data.profileImageUrl) newPic(data.profileImageUrl)
      }
    }
    loadProfile()
  }, [])

  // Change picture
  const picChange = async (e) => {
    const file = e.target.files[0]
    if (!file || !auth.currentUser) return

    const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/profile.jpg`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    newPic(url)

    // Save URL in Firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), { profileImageUrl: url }, { merge: true })
  }

  //firebase ends here
// const picChange=(e)=>{
//     const file=e.target.files[0]
//     if(file){
//       const newUrl=URL.createObjectURL(file)
//       newPic(newUrl)
//     }
//   }

const nameChanger=(e)=>{
const nameEvent=e.target.value
nameEvent.length>0?setName(nameEvent):setName("Change name")
}

const handleBlur = async () => {
    clickUpdate(false)
    if (!auth.currentUser) return
    await setDoc(doc(db, "users", auth.currentUser.uid), { name }, { merge: true })
  }

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      clickUpdate(false)
      if (!auth.currentUser) return
      await setDoc(doc(db, "users", auth.currentUser.uid), { name }, { merge: true })
    }
  }
// const handleBlur=()=>{
// clickUpdate(false)
// }
// const handleKeyDown=(e)=>{
// if(e.key==="Enter"){
//   clickUpdate(false)

// }
// }
  return (
   
           <SideBarWrap $menu={menu}>
          <ProfilePic>
            <label htmlFor="dp">
              <DpWrapper style={{ backgroundImage: `url(${currPic})` }}></DpWrapper>
            </label>
            <input type="file" accept="image/*" id="dp" style={{display:"none"}} onChange={picChange}/>
            <NameWrap>
              <NameChange>
              {nameClick?(<input type="text" onBlur={handleBlur} onKeyDown={handleKeyDown} size={name.length > 0 ? name.length : 1}  maxLength={15}  value={name} id="iconTouch" onChange={nameChanger}/>)
              :(<p>{name}</p>)}
             </NameChange>
             <EditIcon>
               <label htmlFor="iconTouch"> <i className="fa-solid fa-user-pen" onClick={()=>{clickUpdate(true)}}></i></label>
              </EditIcon>
            </NameWrap>
             
            </ProfilePic>  
           <DashStyle>
          <DashButton to="/dashboard"><i className="fa-solid fa-chart-bar"></i>Dashboard</DashButton>
          <DashButton to="/income"> <i className="fa-regular fa-credit-card"></i>Income</DashButton>
          <DashButton to="/expense"><i className="fa-solid fa-money-bill-trend-up"></i>Expense</DashButton>
          <LogOut onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</LogOut>
           </DashStyle>
          
      </SideBarWrap>
      
      
  )
}
