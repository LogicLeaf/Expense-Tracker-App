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
export default function Layout({children}) {
  return (
    <div>
      <LayOutWrap>
      <NavBar/>
      <LowerWrapper>
        <SideBar/>
      <PageContent>
        {children}
      </PageContent>
      </LowerWrapper>
      </LayOutWrap>
    </div>
  )
}
