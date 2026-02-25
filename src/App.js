import './App.css';
import Income from './pages/Income';
import Layout from './components/Layout';
import Expense from './pages/Expense';
import Dashboard from './pages/Dashboard';
import RegistrationPage from './pages/RegistrationPage'
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';
import {UserContext} from "./context/UserContext"
import { useContext } from 'react';
import{
     BrowserRouter as Router,
     Routes,
     Route,
     }from "react-router-dom"


 
function App() {
  const{
      income,
      expense,
      user

  }=useContext(UserContext)
  // ✅ Show loading while auth is being checked
  if (user === undefined) return <Loader/>;

  // ✅ Show signup/login if no user
  if (user === null) return <RegistrationPage />;

  if (income === null || expense === null) return <Loader/>;
  return (
    <>
<Router>
  <Toaster position="top-center" reverseOrder={false} />
 <Layout>
<Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/income" element={<Income/>}/>
    <Route path="/expense" element={<Expense/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/> 
  </Routes>
 </Layout>
</Router>      
    </>
  );
}

export default App;

