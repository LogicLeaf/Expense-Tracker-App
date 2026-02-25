import {useEffect,createContext,useState } from 'react'
import { onAuthStateChanged, signOut} from 'firebase/auth'
import{auth, db } from "../components/firebase";
import useFirebaseSetup from '../components/useFirebaseSetup';
export const UserContext=createContext()
export function UserProvider({children}) {

// 👇 Track login/logout state
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null if logged out, object if logged in
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  // If no user is logged in, show Registration/Login page

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

const[income,setIncome]=useState(null)
const[expense,setExpense]=useState(null)
const[amount,setAmount]=useState("")
const[description,setDescription]=useState("")
const[formOpen,setFormOpen]=useState(false)
const[user,setUser]=useState(undefined)
const[menu, setMenu]=useState(false)
const[currEmoji,setEmoji]=useState("😊")
 const[showPicker,setPicker]=useState(false)
 const[email,setEmail]=useState("")
 const[password,setPassword]=useState("")
 const[checkReg,setCheckReg]=useState(true)
 const [errorMsg, setErrorMsg] = useState(""); // for showing errors
 const[loading,setLoading]=useState(false)
 const firebaseActions=useFirebaseSetup(setIncome,setExpense,user)
  return (
    <UserContext.Provider value={{income,setIncome,expense,setExpense,
    amount,setAmount,description,setDescription,formOpen,setFormOpen,user,setUser,menu, setMenu,
    showPicker,setPicker,currEmoji,setEmoji,email,setEmail,password,setPassword,checkReg,setCheckReg,
    errorMsg, setErrorMsg,loading,setLoading,handleLogout,...firebaseActions}}
    >{children}</UserContext.Provider>
  )
}
