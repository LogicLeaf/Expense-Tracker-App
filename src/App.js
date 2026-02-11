import './App.css';
import Income from './pages/Income';
import Layout from './components/Layout';
import Expense from './pages/Expense';
import Dashboard from './pages/Dashboard';
import RegistrationPage from './pages/RegistrationPage'
import {useState, useEffect} from 'react';
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import{
     BrowserRouter as Router,
     Routes,
     Route,
     }from "react-router-dom"

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { onAuthStateChanged, signOut} from 'firebase/auth'
import{auth, db } from "./components/firebase";
 
function App() {
const[income,setIncome]=useState(null)
const[expense,setExpense]=useState(null)
const[amount,setAmount]=useState("")
const[description,setDescription]=useState("")
const[formOpen,setFormOpen]=useState(false)
const[user,setUser]=useState(undefined)
const[menu, setMenu]=useState(false)

//firestore starts
 // 1) auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
       if (u) {
        setIncome(null);   // trigger loading until Firestore responds
        setExpense(null);
      } else {
        setIncome([]);     // logged out → no data
        setExpense([]);
      }
    });
    return () => unsub();
  }, []);

  // 2) realtime listeners for income & expense for this user
  useEffect(() => {
    if (!user?.uid) {
      setIncome([]);
      setExpense([]);
      return;
    }

    const incomeRef = collection(db, "users", user.uid, "income");
    const expenseRef = collection(db, "users", user.uid, "expense");

    // sort by creation time descending
    const qIncome = query(incomeRef, orderBy("createdAt", "desc"));
    const qExpense = query(expenseRef, orderBy("createdAt", "desc"));

    const unsubIncome = onSnapshot(qIncome, (snap) => {
      setIncome(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubExpense = onSnapshot(qExpense, (snap) => {
      setExpense(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubIncome();
      unsubExpense();
    };
  }, [user]);

  // 3) add handlers (App writes to Firestore)
  const addIncome = async (transaction) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "income"), {
        description: transaction.description,
        amount: transaction.amount,
        emoji: transaction.emoji || "💵",
        date: transaction.date,
        createdAt: serverTimestamp()
      });
      toast.success("Income Added✅");
    } catch (err) {
      console.error("addIncome error:", err);
    }
  };

  const addExpense = async (transaction) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "expense"), {
        description: transaction.description,
        amount: transaction.amount,
        emoji: transaction.emoji || "💸",
        date: transaction.date,
        createdAt: serverTimestamp()
      });
      toast.success("Expense Added✅");
    } catch (err) {
      console.error("addExpense error:", err);
    }
  };

  // 4) delete handlers
  const deleteIncome = async (id) => {
    if (!user)  return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "income", id));
       toast.success("Income deleted✅");
    } catch (err) {
      console.error("deleteIncome error:", err);
    }
  };

  const deleteExpense = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "expense", id));
      toast.success("Expense deleted✅");
    } catch (err) {
      console.error("deleteExpense error:", err);
    }
  };

  //firestore ends


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


  // ✅ Show loading while auth is being checked
  if (user === undefined) return <Loader/>;

  // ✅ Show signup/login if no user
  if (user === null) return <RegistrationPage />;

  if (income === null || expense === null) return <Loader/>;
  return (
    <>
<Router>
  <Toaster position="top-center" reverseOrder={false} />
 <Layout income={income} setIncome={setIncome}
         expense={expense} setExpense={setExpense} 
         description={description} setDescription={setDescription} 
         amount={amount} setAmount={setAmount}
         formOpen={formOpen} setFormOpen={setFormOpen}
         handleLogout={handleLogout}
         addIncome={addIncome}
         addExpense={addExpense}
         deleteIncome={deleteIncome}
         deleteExpense={deleteExpense}
         setMenu={setMenu} menu={menu}
         >
<Routes>
    <Route path="/" element={<Dashboard income={income} setIncome={setIncome}
                                        expense={expense} setExpense={setExpense}
                                        deleteExpense={deleteExpense} deleteIncome={deleteIncome} />}/>
    <Route path="/income" element={<Income income={income} setIncome={setIncome} deleteIncome={deleteIncome}/>}/>
    <Route path="/expense" element={<Expense expense={expense} setExpense={setExpense} deleteExpense={deleteExpense} />}/>
    <Route path="/dashboard" element={<Dashboard income={income} setIncome={setIncome}
                                        expense={expense} setExpense={setExpense}
                                        deleteExpense={deleteExpense} deleteIncome={deleteIncome}/>}/> 
  </Routes>
 </Layout>
</Router>      
    </>
  );
}

export default App;

