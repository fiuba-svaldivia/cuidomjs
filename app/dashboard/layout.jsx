"use client"
import { Navbar, SideBar } from "../dev/page"
import { useState } from "react"


export default function DashboardLayout({children}) {
    const [ showMenu, setShowMenu] = useState(true)

    const handleMenuState = () => {
        setShowMenu(!showMenu)
    }
    
    const navbarHeight="70px"
    const rolesFetch = ['Contaduría', 'Inicio']

    const sidebarWidthDefault = "80px"
    const sidebarWidthExtend = "200px"

    const sidebarWidth = showMenu ? sidebarWidthDefault : sidebarWidthExtend;


    return(
        <>  
        <nav className="fixed w-full top-0 z-10">
            <Navbar handleMenuState={handleMenuState} height={`h-[${navbarHeight}]`}/>
        </nav>


        <section className={`fixed left-0`} style = {{top: `${navbarHeight}`, height: `calc(100vh - ${navbarHeight})`}}>
            <SideBar showMenu={showMenu} roles={rolesFetch} widthDefault="w-[80px]" widthExtend="w-[200px]"/>
        </section>

        <div
        className="relative"
        style={{
          top: `${navbarHeight}`,
          left: `${sidebarWidth}`,
          width: `calc(100vw - ${sidebarWidth})`,
        }}
      >
        {children}
      </div>

        </>
    )
}