import { useState } from "react";
import { CarritoContext } from "./CarritoContext"
import { tiendas } from "@/DB";

export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([])
    // const updateUsuario = () => {
    //     const token = localStorage.getItem("token")
    //     if(!token) return setUsuario(null)
    //     axios.get("/user/token/"+token)
    //     .then(({data}) => setUsuario(data))
    // }

    const agregarCarrito = (producto) => {
        const nombreTienda = tiendas.find(t => t.id == producto.tiendaId).nombre
        if (carrito.length) {
            const productoBuscado = carrito.find(c => c.productoId == producto.productoId && c.tiendaId == producto.tiendaId);
            if (productoBuscado) {
                productoBuscado.cantidad++;
                setCarrito([...carrito])
            } else {
                setCarrito([...carrito, {...producto, nombreTienda}]);
            }
        } else {
            setCarrito([{...producto, nombreTienda}]);
        }
    }

    const quitarDelCarrito = (producto) => {
        if (carrito.length) {
            const productoBuscado = carrito.find(c => c.productoId == producto.productoId && c.tiendaId == producto.tiendaId);
            console.log(productoBuscado)
            if (productoBuscado?.cantidad > 1) {
                productoBuscado.cantidad--;
                setCarrito([...carrito])
            } else {
                setCarrito(carrito.filter(c => c !== productoBuscado));
            }
        }
    }

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito, agregarCarrito, quitarDelCarrito }}>
            {children}
        </CarritoContext.Provider>
    )
}