
// import {useState, useEffect} from 'react'
// 
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   deleteDoc,
//   doc,
//   serverTimestamp,
//   query,
//   orderBy
// } from 'firebase/firestore';
// import { onAuthStateChanged, signOut} from 'firebase/auth'
// import{auth, db } from "./firebase";


// export default function FireStoreSetup({setIncome,setExpense,user,setUser}) {
    
// //firestore starts
//  // 1) auth listener
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//        if (u) {
//         setIncome(null);   // trigger loading until Firestore responds
//         setExpense(null);
//       } else {
//         setIncome([]);     // logged out → no data
//         setExpense([]);
//       }
//     });
//     return () => unsub();
//   }, []);

//   // 2) realtime listeners for income & expense for this user
//   useEffect(() => {
//     if (!user?.uid) {
//       setIncome([]);
//       setExpense([]);
//       return;
//     }

//     const incomeRef = collection(db, "users", user.uid, "income");
//     const expenseRef = collection(db, "users", user.uid, "expense");

//     // sort by creation time descending
//     const qIncome = query(incomeRef, orderBy("createdAt", "desc"));
//     const qExpense = query(expenseRef, orderBy("createdAt", "desc"));

//     const unsubIncome = onSnapshot(qIncome, (snap) => {
//       setIncome(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });

//     const unsubExpense = onSnapshot(qExpense, (snap) => {
//       setExpense(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });

//     return () => {
//       unsubIncome();
//       unsubExpense();
//     };
//   }, [user]);

//   // 3) add handlers (App writes to Firestore)
//   const addIncome = async (transaction) => {
//     if (!user) return;
//     try {
//       await addDoc(collection(db, "users", user.uid, "income"), {
//         description: transaction.description,
//         amount: transaction.amount,
//         emoji: transaction.emoji || "💵",
//         date: transaction.date,
//         createdAt: serverTimestamp()
//       });
//       toast.success("Income Added✅");
//     } catch (err) {
//       console.error("addIncome error:", err);
//     }
//   };

//   const addExpense = async (transaction) => {
//     if (!user) return;
//     try {
//       await addDoc(collection(db, "users", user.uid, "expense"), {
//         description: transaction.description,
//         amount: transaction.amount,
//         emoji: transaction.emoji || "💸",
//         date: transaction.date,
//         createdAt: serverTimestamp()
//       });
//       toast.success("Expense Added✅");
//     } catch (err) {
//       console.error("addExpense error:", err);
//     }
//   };

//   // 4) delete handlers
//   const deleteIncome = async (id) => {
//     if (!user)  return;
//     try {
//       await deleteDoc(doc(db, "users", user.uid, "income", id));
//        toast.success("Income deleted✅");
//     } catch (err) {
//       console.error("deleteIncome error:", err);
//     }
//   };

//   const deleteExpense = async (id) => {
//     if (!user) return;
//     try {
//       await deleteDoc(doc(db, "users", user.uid, "expense", id));
//       toast.success("Expense deleted✅");
//     } catch (err) {
//       console.error("deleteExpense error:", err);
//     }
//   };

//   //firestore ends


// // 👇 Track login/logout state
// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // null if logged out, object if logged in
//     });
//     return () => unsubscribe(); // cleanup listener on unmount
//   }, []);

//   // If no user is logged in, show Registration/Login page

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("User logged out");
//       })
//       .catch((error) => {
//         console.error("Logout error:", error);
//       });
//   };
//   return (
//     <div>
      
//     </div>
//   )
// }
