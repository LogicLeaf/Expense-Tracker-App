import React from 'react'
import {useContext} from 'react'
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import{app} from "../components/firebase";
import styled from 'styled-components';
import { FcGoogle } from "react-icons/fc";
import BannerDefault from "../Assets/Banner_Default.jpg";
import { UserContext } from '../context/UserContext';

const MainWrapper=styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
width:100%;

`
const InnerDiv=styled.div`
display:flex;
height:60vh;
width:50%;
border: 1px solid #e0e0e0ff;
box-shadow:0 0 0 2px #f1f1f1ff;
background-color: #ffffffff;

@media(max-width:600px){
width:70%;}
`
const CoverImage=styled.div`
width:50%;

background-image:url(${BannerDefault});
 background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;

  @media(max-width:600px){
  display:none;}
`

const Content=styled.div`
width:50%;
height:100%;
background-color: #ffffffff;
padding:80px;
@media(max-width:600px){
width:100%;
 padding:30px; }
`

const FormStyle=styled.div`
margin:10px 0px;
display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:column;
font-size: 8px;
margin:20px 0;
font-weight:500;
`
const DescriptionWrap=styled.div`
width: 100%;
padding-top:8px;
 input {
    width: 100%;
    height:25px;
    padding: 8px;
    border: 1px solid #e0e0e0ff;
    border-radius: 2px;
    outline: none;
    font-size: 10px;
    &:focus {
      outline:1px solid #e0e0e0ff;
      box-shadow: 0 0 0 3px rgba(159, 159, 159, 0.2);
    }
  }
`
const Heading=styled.h6`
font-size:18px;
font-weight:700;
`

const SubText=styled.div`
font-size:8px;
color: #797979ff;
`

const SignUpbutton=styled.div`
width:100%;
height:1.5rem;
display:flex;
justify-content:center;
align-items:center;
background-color: #61459e;
color: #edededff;
font-size:8px;
border-radius:2px;
margin-bottom:20px;
cursor:pointer;
&:hover{
background-color: #7353b9ff;
}
`

const Googlebutton=styled.div`
width:100%;
height:1.5rem;
display:flex;
justify-content:center;
align-items:center;
background-color: #ffffffff;
border: 1px solid #e0e0e0ff;
font-size:8px;
border-radius:2px;
margin-bottom:20px;
cursor:pointer;
&:hover{
background-color: #edededff;
}
`

const SignInbutton=styled.div`
width:100%;
height:1.5rem;
display:flex;
justify-content:center;
align-items:center;
background-color:${props=>props.showLoading? "#747474ff": "#7353b9ff"};
color: #edededff;
font-size:8px;
border-radius:2px;
margin-bottom:20px;
cursor:pointer;
&:hover{
background-color:${props=>props.showLoading? "#747474ff": "#7353b9ff"};
}
`

const NoAccount=styled.div`
font-size:7px;
color: #797979ff;
display:flex;
justify-content:center;
`
const HaveAccount=styled.div`
font-size:7px;
color: #797979ff;
display:flex;
justify-content:center;
`

const SignUpToggle=styled.div`
color: #5b1ec5ff;
cursor:pointer;
padding-left:5px;
font-weight:500;
&:hover{
text-decoration:underline;}

`
const SignInToggle=styled.div`
color: #5b1ec5ff;
cursor:pointer;
padding-left:5px;
font-weight:500;
&:hover{
text-decoration:underline;}
`

const SignInGroup=styled.div`
`
const SignUpGroup=styled.div`
`
export default function RegistrationPage() {

const{
email,
checkReg,
errorMsg,
password,
setPassword,
setErrorMsg,
setEmail,
setLoading,
setCheckReg,
loading

}=useContext(UserContext)
const auth=getAuth(app)

// --- Firebase Google Sign-In ---
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setErrorMsg(""); // clear any previous error
      window.location.href = "/dashboard"; 
    } catch (error) {
      // Map common Google Auth errors
      if (error.code === "auth/popup-closed-by-user") setErrorMsg("Popup closed before completing sign-in.");
      else if (error.code === "auth/cancelled-popup-request") setErrorMsg("Popup request was canceled.");
      else setErrorMsg("Google sign-in failed. Try again.");
    }
  };

  // --- Sign Up ---
  const signUpUser = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setErrorMsg("");
      setEmail("");
      setPassword("");
      window.location.href = "/dashboard";
    } catch (error) {
      // Map email/password sign-up errors
      if (error.code === "auth/email-already-in-use") setErrorMsg("Email is already registered.");
      else if (error.code === "auth/invalid-email") setErrorMsg("Invalid email format.");
      else if (error.code === "auth/weak-password") setErrorMsg("Password should be at least 6 characters.");
      else setErrorMsg("Sign-up failed. Try again.");
    }
  };

  // --- Sign In ---
  const signInUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMsg("");
      setEmail("");
      setPassword("");
      window.location.href = "/dashboard";
    } catch (error) {
      // Map email/password sign-in errors
      if (error.code === "auth/user-not-found") setErrorMsg("No account found with this email.");
      else if (error.code === "auth/wrong-password") setErrorMsg("Incorrect password.");
      else if (error.code === "auth/invalid-email") setErrorMsg("Invalid email format.");
      else setErrorMsg("Sign-in failed. Try again.");
    }finally {
    setLoading(false);
  }
  };


const emailHandle=(e)=>{
setEmail(e.target.value)
}

const passwordHandle=(e)=>{
setPassword(e.target.value)
}



  return (
    <MainWrapper>
    <InnerDiv>
      < Content>
      <Heading>Welcome back!</Heading>
      <SubText>Please enter your details</SubText>
        <FormStyle>
          <label htmlFor="email">Email Address</label>
          <DescriptionWrap> <input type="email" name="" id="email" onChange={emailHandle} value={email} /></DescriptionWrap>
        </FormStyle>

        <FormStyle>
          <label htmlFor="password">Password</label>
          <DescriptionWrap> <input type="password" id="password" onChange={passwordHandle} value={password} /></DescriptionWrap>
        </FormStyle>
     {errorMsg && <div style={{ color: "red", fontSize:"0.6rem", marginBottom:"10px" }}>{errorMsg}</div>}
      {checkReg?(<SignInGroup><SignInbutton $showLoading={loading} onClick={signInUser}>SignIn</SignInbutton>
      <Googlebutton onClick={signInWithGoogle}><FcGoogle style={{marginRight:"6px"}}  size={16} />Sign in with google</Googlebutton>
      <NoAccount>
        Don't have an account? <SignUpToggle onClick={() => { setCheckReg(false); setErrorMsg(""); }}>Signup</SignUpToggle>
      </NoAccount></SignInGroup>):
      
      (<SignUpGroup><SignUpbutton onClick={signUpUser}>SignUp</SignUpbutton>
      <Googlebutton onClick={signInWithGoogle}><FcGoogle style={{marginRight:"6px"}}  size={16} />Sign in with google</Googlebutton>
      <HaveAccount>
        have an account? <SignInToggle onClick={() => { setCheckReg(true); setErrorMsg(""); }}> Signin</SignInToggle>
      </HaveAccount></SignUpGroup>)}
      
      

      
    </ Content>
      <CoverImage>

      </CoverImage>
      </InnerDiv>       
    </MainWrapper>
    
  )
}
