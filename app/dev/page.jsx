'use client'
import { PlusCircleIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import { Bars3Icon, HomeIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function DevPage() {
    const [ showMenu, setShowMenu] = useState(true)

    const handleMenuState = () => {
        setShowMenu(!showMenu)
    }

    const dataResumen = [
        { id: 1, nombre: "Tarifa única", valor: 5000, horas: 15 },
        { id: 2, nombre: "Tarifa doble", valor: 10000, horas: 20},
        { id: 3, nombre: "Tarifa triple", valor: 15000, horas: 20 },
        { id: 4, nombre: "Tarifa cuádruple", valor: 20000, horas: 1 }
    ]

    const dataTarifaInitial = [
        {id: 1, nombre: "Tarifa 1", valor: 5000},
        {id: 2, nombre: "Tarifa 2", valor: 5000}
    ]

    const [dataTarifa, setDataTarifa] = useState(dataTarifaInitial)
    const objetoPrueba = {valorInicial: "Milanesa"}

    return (
        <>  
                <div className="flex flex-col justify-start gap-5 mt-[50px] mx-[50px] sm:mx-[100px] xl:mx-[400px]">
                    <div>   
                        <h1 className="text-xl font-bold">Componentes</h1>
                        <hr className="w-full mt-[2px] border-solid border-gray-200 "/>
                    </div>

                    {/* <Navbar handleMenuState={handleMenuState} height={"h-[70px]"}/>

                    <SideBar showMenu={showMenu} roles={['Inicio', 'Finanzas', 'Contaduría']} widthDefault="w-[80px]" widthExtend={"w-[500px]"}/> */}

                    <div className="flex flex-col lg:flex-row gap-5 w-full justify-between">
                        <div className="flex gap-2">
                            <SelectPeriodo/>
                            <AddButton/>
                        </div>

                        <div className="flex gap-2">
                            <InputFecha/>
                            <InputFecha/>
                        </div>


                    </div>
                    
                    {/* SELECT HEADER */}
                    <div className="flex flex-row justify-center md:justify-start items-center px-2 md:px-10 gap-5 py-5
                                    w-full
                                    rounded-md bg-gray-300">
                            <SelectMain campo="Coordinación"/>
                            <SelectMain campo="Familia"/>
                    </div>

                    <section className="flex flex-col gap-5 xl:flex-row w-full">

                        <ResumenPad data={dataResumen}/>

                        <div className="w-full xl:w-1/2 xl:h-auto bg-white px-10 py-10 rounded-md bg-blue-500">

                        </div>
                    </section>
                        
                    {/* Prueba de inputs */}
                    <section className="flex flex-row gap-5 p-10 w-full bg-blue-500 rounded-md">
                        <InputPrueba valor = "Tarifa 1"/>
                        <InputPrueba valor = "Tarifa 2"/>
                        <InputPrueba valor = {400} type = "number"/>
                        <InputPrueba valor = {"12:00"} type="time"/>

                    </section>
                    
                </div>

        </>
    )   
}


const InputPrueba = ( {valor, type} ) => {
        const [text, setText] = useState(valor)
        return(
                <input className ="min-w-[20px] text-black rounded-sm text-center" value = {text} onChange = {e => {setText(e.target.value)}} type={type}/>


        )
    }

const Navbar = ({ handleMenuState, height }) => {
    return(
        <div className={`flex flex-row gap-4 justify-start items-center w-full ${height} px-[20px] py-[2px] bg-gray-500`}>
            <ToggleNavbarButton onClick={handleMenuState}/>
            <h1 className="text-xl font-bold tracking-tighter">CUIDOM</h1>
        </div>
)}

const ToggleNavbarButton = ( { onClick } ) => {
    return (
        <button onClick={onClick} className="px-[4px]
                                        bg-transparent rounded-md backdrop-brightness-100 hover:backdrop-brightness-75 transition duration-300">
            <Bars3Icon className="size-6"></Bars3Icon>
        </button>
    )
}

const SideBarButton = ( {clickState, Icon, text, index } ) => {
    return (
        <button className="flex flex-row gap-5 w-full py-[10px] px-[30px] items-center justify-start 
                        bg-transparent backdrop-brightness-100 hover:backdrop-brightness-125 transition duration-100 ">
            <Icon className="size-5"/>

            {clickState ? null : <span>{text}</span>}
        </button>
    )
}

const SideBar = ( {showMenu, roles, widthDefault, widthExtend} ) => {
    return(
        <div className= {`flex flex-col align-center justify-start gap-2 h-full ${showMenu ? widthDefault : widthExtend} bg-gray-500 text-sm transition duration-300`}>
            {roles.map( (rol, index) => <SideBarButton key = {index} clickState={showMenu} Icon = {HomeIcon} text = {rol}/>)}
        </div>
    )
}


const SelectPeriodo = ( {} ) => {
    return(
        <select className="rounded-md px-6 py-1 text-black text-sm">
            <option value="">Periodo</option>
        </select>
    )
}

const InputFecha = ( { }) => {
    return(
        <input type="date" className="px-6 py-1 text-black text-sm rounded-md"/>
    )
}

const AddButton = () => {
    return(
        <button className="bg-white px-3 text-black rounded-lg">
            +
        </button>

    )
}

const SelectMain = ({campo}) => {
    return(
        <div className="flex flex-col">
            <label className= "text-xs text-gray-500" htmlFor={campo}>{campo}</label>
            <select id={campo} className="pr-4 py-1 border-b-2 border-gray-500 bg-transparent text-md text-black">
                <option>{campo}</option>
            </select>
        </div>
    )
}

const ResumenLine = ( {desc, monto, total, modo, conIva = true, handleIva} ) => {

    return(
        <div className={`flex flex-row justify-between text-sm ${total ? "font-bold": null}`}>
            <div className="flex flex-row gap-2 align-center justify-center">
                
                {(modo === "iva") ? <input checked = {conIva} onChange = {handleIva} className = "bg-transparent" type="checkbox"/> : null}
                <span>{desc}</span>
            </div>

            {(modo === "horas") ? <span>{monto}h</span> : null}
            {(modo === "ars" || modo === "iva") ? <span className={`${(conIva) ? null: "line-through"}`}>${monto}</span>: null}
   
        </div>
    )
}

const ResumenPad = ({data}) => {
    const [conIva, setConIva] = useState(true)
    const handleIva = ( e ) => {
        setConIva(e.target.checked)
    }

    const montoBruto = data.reduce((acc, item) => acc + (item.valor * item.horas), 0);
    const montoIVA = montoBruto * 0.21

    const montoNeto = conIva ? montoBruto + montoIVA : montoBruto
    
    return(
        <div className="flex flex-col justify-start gap-2 
        w-full xl:w-1/2
        px-10 py-10 bg-purple-500 rounded-md">
        <span className="text-md  underline font-bold">RESUMEN</span>
        {/* Esto sería el texto */}
        <div className="flex flex-col gap-1">
            {data.map( item => <ResumenLine key={item.id} desc = {`${item.nombre} ($${item.valor})`} monto={item.horas} modo="horas"/>)}

            <hr />
            <ResumenLine desc = "MONTO BRUTO" monto = {montoBruto} modo = "ars" total={true}/>
            <ResumenLine desc = "I.V.A (21%)" monto = {montoIVA} modo = "iva" conIva={conIva} handleIva={handleIva} />
            <hr />
            <ResumenLine desc = "MONTO NETO" monto = {montoNeto} modo = "ars" total = {true} />
        </div>
</div>

    )
}

export {Navbar, SideBar}