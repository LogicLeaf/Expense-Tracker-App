import styled from 'styled-components'
import SideBar from './SideBar'
import NavBar from './NavBar'

const LayOutWrap=styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100vh;

`
const LowerWrapper=styled.div`
display:flex;
width:100%;
height:100%;

`
const PageContent=styled.div`
display:flex;
justify-content:center;
width:80%;
height:100%;
box-sizing:border-box;
padding:25px 25px 0px;
border-radius:10px;
@media(max-width:800px)
{
width:100%;
flex-direction:column;
}
`
export default function Layout({setMenu,menu,addIncome,addExpense, handleLogout,children,setFormOpen,formOpen,income,setIncome,expense,setExpense,amount,setAmount,description,setDescription}) {
  return (
    <div>
      <LayOutWrap>
      <NavBar income={income} setIncome={setIncome}
         expense={expense} setExpense={setExpense} 
         description={description} setDescription={setDescription} 
         amount={amount} setAmount={setAmount}
         formOpen={formOpen} setFormOpen={setFormOpen}
         addIncome={addIncome}
         addExpense={addExpense}
         setMenu={setMenu} menu={menu}
          />
      <LowerWrapper>
        <SideBar handleLogout={handleLogout} menu={menu}/>
      <PageContent>
        {children}
      </PageContent>
      
      </LowerWrapper>
      

      </LayOutWrap>
      
    </div>
  )
}
