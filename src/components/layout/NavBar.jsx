import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import icon from "/me2.png"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SVG from "/marca.svg"
import Rifavo from "../icons/branding/Rifavo"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowDownToLine, CalendarDays, History, LogOut, QrCode, ShoppingBasket, ShoppingCart, Ticket, Trophy, User } from "lucide-react"
import { DownloadTableExcel } from "react-export-table-to-excel"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { Separator } from "../ui/separator"
import { obfuscateEmail, obfuscateName } from "@/utils/helpers/obfuscated"
import { toast } from "../ui/use-toast"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ReciboDePago from "../../pages/plantillas/ReciboDePago"
import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"
import { ModeToggle } from "../mode-toggle"
import RifavoLight from "../icons/branding/RifavoLight"
import p1 from "../../../public/p1.jpg"
import p2 from "../../../public/p2.jpg"
import p3 from "../../../public/p3.jpg"
import { CarritoContext } from "../context/CarritoContext"
import { precioDolar } from "@/utils/helpers/precioDolar"

const NavBar = () => {

    const { carrito, setCarrito, quitarDelCarrito } = useContext(CarritoContext)

    const vaciarCarrito = () => {
        setCarrito([])
    }

    return (
        <>
            <div className="fixed w-full h-20 flex items-center px-10 lg:px-40 justify-between bg-white dark:bg-[#262635] bg-opacity-95 z-10">
                <div className="relative flex">
                    <a href="/" className="relative">
                        <div className="absolute invisible sm:visible dark:invisible h-full w-32 sm:w-40 flex items-center">
                            <Rifavo />
                        </div>
                        <div className="absolute invisible sm:dark:visible h-full w-32 sm:w-40 flex items-center">
                            <RifavoLight />
                        </div>
                    </a>
                    <div className="sm:relative sm:left-52">
                        <ModeToggle />
                    </div>
                    {/* <div className="sm:relative sm:left-52 ml-2">
                        <Input onChange={handleForm} name="email" value={form?.email} placeholder="Buscar productos" />
                    </div> */}
                </div>
                <Sheet>
                    <SheetTrigger className="relative inline-flex items-center">
                        <ShoppingBasket className="w-10 h-10 -y-10" />
                        <Badge className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-6 -end-2 dark:border-gray-900" variant="destructive">{carrito.length}</Badge>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Carrito de compras</SheetTitle>
                            <SheetDescription>
                                Actualmente para hacer el pedido necesitas tener Whatsapp para enviar el pedido y ser procesado por DOMMI
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-5 mt-6 max-h-80 min-h-80 overflow-auto mb-10">
                            {!carrito.length && <h3 className="text-gray-500 flex items-center"><ShoppingCart className="w-4 h-4 mr-2"/> El carrito está vacío</h3>}
                            {carrito.map(c => 
                            <div className="flex gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                <div className="rounded-lg w-16 h-16 overflow-hidden">
                                    <img src={c.imagen} alt="Imagen" className="object-cover h-full m-auto" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{c.nombre}</p>
                                    <h2 className="font-bold text-sm my-1">${c.precio} <span className="text-sm text-gray-600 font-normal"> x {c.cantidad}</span></h2>
                                </div>
                                </div>
                                <Button onClick={() => quitarDelCarrito({productoId:c.productoId, tiendaId:c.tiendaId})}>Quitar</Button>
                            </div>)}
                        </div>
                        {carrito.length > 0 && <div>
                            {/* <Button onClick={() => vaciarCarrito()} className="my-2 w-full bg-red-500 text-white hover:bg-red-400">Vaciar carrito</Button> */}
                            <h2 className="font-bold text-lg">Total: ${carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0)} <span className="text-sm text-gray-600 font-normal"> ≈ {Math.ceil(carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0) * precioDolar)} bs</span></h2>
                            <a href={`https://api.whatsapp.com/send/?phone=573118268264&text=*Detalles del pedido*%0A${carrito.reduce((acc, curr) => acc+`*${curr.nombreTienda}* - ${curr.nombre} x${curr.cantidad}%0A`,"")}%0A *Total a pagar: $${carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0)}*  ≈ ${Math.ceil(carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0) * precioDolar)} bs`} target="_blank"><Button className="mt-2 w-full">Hacer pedido</Button></a>
                        </div>}
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default NavBar