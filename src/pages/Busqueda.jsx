import { useParams } from "react-router-dom"
import { tiendas } from "@/DB";
import { CarritoContext } from "@/components/context/CarritoContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { precioDolar } from "@/utils/helpers/precioDolar";
import { Frown, Timer } from "lucide-react";

const Busqueda = () => {
    const { busqueda } = useParams()
    const [tiendasFiltradas, setTiendasFiltradas] = useState([])

    const { carrito, setCarrito, agregarCarrito, quitarDelCarrito } = useContext(CarritoContext)

    useEffect(() => {
        const filtro = tiendas.filter(tienda => tienda.productos.some(producto =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        ))
        console.log(filtro)
        setTiendasFiltradas(filtro)
    }, [busqueda])

    return (
        <>
            <div className="px-5 sm:px-20 lg:px-20 text-start flex flex-col pt-24 py-0 lg:py-28 lg:flex-row min-h-[100vh]">
                    {!tiendasFiltradas.length ? <div className="flex flex-col w-full items-center justify-center gap-4"><Frown/><h3 className="text-base text-gray-400">No hemos conseguido resultados</h3></div>:
                    <p className="text-gray-400">Hemos encontrado {tiendasFiltradas.reduce((acc,curr) => acc+curr.productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase())).length ,0)} producto(s)</p>}
                <div className="flex flex-col gap-10">
                    {tiendasFiltradas?.map(tienda => <div>
                        <div className="flex items-center">
                            <div className="rounded-lg my-4 w-16 h-16 overflow-hidden">
                                <img src={tienda.imagen} alt="Imagen" className="object-cover h-full" />
                            </div>
                            <div>
                                <p className="ml-4 text-lg font-bold">{tienda.nombre}</p>
                                <p className="ml-4 text-sm text-gray-600 font-normal flex"><Timer className="w-4 h-4 text-slate-500 mr-1" /> Entrega estimada {tienda.estimado} min</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex overflow-auto pb-4 gap-10">
                                {!tienda.productos.length && <h3 className="text-base text-gray-400 w-full">Este negocio aún no tiene productos</h3>}
                                {tienda.productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase())).map(p =>
                                    <div className="flex items-center max-w-fit p-4 w-64 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
                                        <div className="rounded-lg min-w-20 min-h-20 overflow-hidden m-auto">
                                            <img src={p.imagen} alt="Imagen" className="object-cover h-full m-auto" />
                                        </div>
                                        <div className="text-left px-6">
                                            <h2 className="font-bold text-base my-1">${p.precio} <span className="text-sm text-gray-600 font-normal"> ≈ {Math.ceil(p.precio * precioDolar)} bs</span></h2>
                                            {/* <p className="text-slate-500 mb-2">El mejor pollo de la ciudad</p> */}
                                            <div className="flex">
                                                {/* <Timer className="w-4 h-4 text-slate-500 mr-1" /> */}
                                                <p className="text-sm mb-1">{p.nombre}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <Button className="h-5 w-3" onClick={() => quitarDelCarrito({ productoId: p.id, tiendaId: tienda.id })}>-</Button>
                                                <p className="font-bold h-6 w-4">{carrito.find(c => c.tiendaId == tienda.id && c.productoId == p.id)?.cantidad ?? 0}</p>
                                                <Button className="h-5 w-3" onClick={() => agregarCarrito({ productoId: p.id, tiendaId: tienda.id, cantidad: 1, imagen: p.imagen, precio: p.precio, nombre: p.nombre })}>+</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default Busqueda