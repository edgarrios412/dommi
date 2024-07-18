import { UserContext } from "@/components/context/UserContext"
import Carrusel from "@/components/layout/Carrusel"
import NavBar from "@/components/layout/NavBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import ani1 from '../../public/animations/empty.json';
import winner from '../../public/animations/winner.json';
import { ArrowLeft, CalendarDays, CheckCircle2, ChevronLeft, CreditCard, Package, Ticket, Timer, Trophy } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Lottie from "lottie-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ColorExtractor } from "react-color-extractor"
// import neg4 from "../../public/neg4.png"
// import neg1 from "../../public/neg1.jpg"
import p1 from "../../public/p1.jpg"
import p2 from "../../public/p2.jpg"
import p3 from "../../public/p3.jpg"
import { tiendas } from "@/DB"
import { precioDolar } from "@/utils/helpers/precioDolar"
import { CarritoContext } from "@/components/context/CarritoContext"

const TiendaDetail = () => {
    const { id } = useParams()
    const [tienda, setTienda] = useState()
    const navigate = useNavigate()

    const { carrito, setCarrito, agregarCarrito, quitarDelCarrito } = useContext(CarritoContext)

    useEffect(() => {
        setTienda(tiendas.find(t => t.id == id))
    })

    useEffect(() => {
        // console.log(carrito)
    }, [carrito])

    const [color, setColor] = useState("#ffffff")

    return (
        <>
            <div style={{ backgroundColor: color }} className={`bg-[${color}] pt-20`}>
                <Button className="flex m-4" onClick={() => navigate("/")}><ArrowLeft className="mr-2 w-4 h-4" />Volver</Button>
                <div className={`flex items-center justify-center`}>
                    <div className="rounded-lg w-28 h-28 overflow-hidden mb-10">
                        <ColorExtractor getColors={colors => setColor(colors[0])}>
                            <img src={tienda?.imagen} alt="Imagen" className="object-cover h-full" />
                        </ColorExtractor>
                    </div>
                </div>
            </div>
            <div id="sorteos" className="justify-evenly min-h-[100vh] h-fit bg-slate-50 dark:bg-[#14141A] mt-0 py-10 px-2">
                <div>
                    <div className="flex items-center justify-center flex-col">
                    <h1 className="text-[30px] sm:text-[35px] lg:text-[50px] mb-10 font-extrabold flex items-center"><Package className="mr-4" />Productos</h1>
                        <div className="grid justify-center grid-cols-1 min-[440px]:grid-cols-2 items-center sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                            {!tienda?.productos?.length && <h3 className="text-xl text-gray-400 w-full">Este negocio aún no tiene productos</h3>}
                            {tienda?.productos?.map(p =>
                                <div className="flex-col items-center max-w-40 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
                                    <div className="rounded-lg w-28 h-28 overflow-hidden m-auto">
                                        <img src={p.imagen} alt="Imagen" className="object-cover h-full m-auto" />
                                    </div>
                                    <div className="text-left px-6">
                                        <h2 className="font-bold text-lg my-1">${p.precio} <span className="text-sm text-gray-600 font-normal"> ≈ {Math.ceil(p.precio * precioDolar)} bs</span></h2>
                                        {/* <p className="text-slate-500 mb-2">El mejor pollo de la ciudad</p> */}
                                        <div className="flex">
                                            {/* <Timer className="w-4 h-4 text-slate-500 mr-1" /> */}
                                            <p className="text-sm mb-4">{p.nombre}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <Button className="h-5 w-3" onClick={() => quitarDelCarrito({ productoId: p.id, tiendaId: id })}>-</Button>
                                            <p className="font-bold">{carrito.find(c => c.tiendaId == id && c.productoId == p.id)?.cantidad ?? 0}</p>
                                            <Button className="h-5 w-3" onClick={() => agregarCarrito({ productoId: p.id, tiendaId: id, cantidad: 1, imagen: p.imagen, precio: p.precio, nombre: p.nombre })}>+</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TiendaDetail