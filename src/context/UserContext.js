import { createContext,useState } from 'react'
export const UserContext=createContext()
export function UserProvider({children}) {
const[income,setIncome]=useState(null)
const[expense,setExpense]=useState(null)
const[amount,setAmount]=useState("")
const[description,setDescription]=useState("")
const[formOpen,setFormOpen]=useState(false)
const[user,setUser]=useState(undefined)
const[menu, setMenu]=useState(false)
const[currEmoji,setEmoji]=useState("😊")
 const[showPicker,setPicker]=useState(false)
  return (
    <UserContext.Provider value={{income,setIncome,expense,setExpense,
    amount,setAmount,description,setDescription,formOpen,setFormOpen,user,setUser,menu, setMenu,
    showPicker,setPicker,currEmoji,setEmoji}}
    >{children}</UserContext.Provider>
  )
}
