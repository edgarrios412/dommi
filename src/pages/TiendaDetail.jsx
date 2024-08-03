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
import { ArrowLeft, CalendarDays, CheckCircle2, ChevronLeft, CreditCard, MapPin, Package, Ticket, Timer, Trophy } from "lucide-react"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import IconoUbicacion from "/placeholder.png"

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
    const markers = [
        {
            geocode: tienda?.coordenadas,
            popUp: tienda?.nombre
        }
    ];

    // create custom icon
    const customIcon = new Icon({
        // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconUrl: IconoUbicacion,
        iconSize: [32, 32] // size of the icon
    });

    const createClusterCustomIcon = function (cluster) {
        return new divIcon({
            html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
            className: "custom-marker-cluster",
            iconSize: point(33, 33, true)
        });
    };

    const [position, setPosition] = useState(null);

    useEffect(() => {
        const onSuccess = (position) => {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        };

        const onError = (error) => {
            console.error('Error al obtener la ubicación:', error);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

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
            <div className="bg-slate-50 dark:bg-[#14141A] items-center flex flex-col justify-center py-6">
                <p className="text-3xl font-bold">{tienda?.nombre}</p>
                <p className="flex items-center gap-2 my-1 text-gray-600"><CalendarDays className="w-5 h-5" /> Lun - Vie 8am - 11pm</p>
                <Sheet>
                    <SheetTrigger>
                        <Button className="mt-2"><MapPin className="w-4 h-4 mr-2" /> Ver ubicación</Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:w-full">
                        {/* <p>Hola</p> */}
                        {/* <div className="bg-red-600 w-full h-full"> */}
                        <MapContainer center={tienda?.coordenadas} zoom={14}>
                            {/* OPEN STREEN MAPS TILES */}
                            <TileLayer
                                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* WATERCOLOR CUSTOM TILES */}
                            {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
                            {/* GOOGLE MAPS TILES */}
                            {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}

                            <MarkerClusterGroup
                                chunkedLoading
                                iconCreateFunction={createClusterCustomIcon}
                            >
                                {/* Mapping through the markers */}
                                {markers.map((marker) => (
                                    <Marker position={marker.geocode} icon={customIcon}>
                                        <Popup>{marker.popUp}</Popup>
                                    </Marker>
                                ))}
                            </MarkerClusterGroup>
                            <Marker position={[position?.latitude, position?.longitude]} icon={customIcon}>
                                <Popup>Mi ubicación</Popup>
                            </Marker>
                        </MapContainer>
                        {/* </div> */}
                    </SheetContent>
                </Sheet>
            </div>
            <div id="sorteos" className="justify-evenly min-h-[100vh] h-fit bg-slate-50 dark:bg-[#14141A] mt-0 py-10 px-2">
                <div>
                    <div className="flex items-center justify-center flex-col">
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-10 font-extrabold flex items-center"><Package className="mr-4" />Productos</h1>
                        <div className="grid justify-center grid-cols-2 min-[440px]:grid-cols-2 items-center sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
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