import Footer from './Footer/Footer.jsx'
import Header from './Header/Header.jsx'
import Home from './Home/Home.jsx'
import { Outlet } from 'react-router'
function Layout(){
    return
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}

export default Layout