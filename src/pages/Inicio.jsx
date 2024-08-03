import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from 'framer-motion';
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, BookUser, Bot, Brain, BrainCircuit, Brush, CalendarDays, CheckCircle2, Database, Dices, Fingerprint, Folder, Gift, HelpCircle, Linkedin, Mail, Search, Server, Ticket, TicketCheck, Timer } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Lottie from 'lottie-react';
import domicilio from '../assets/animations/domicilio.json';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tiendas } from "@/DB";

const Inicio = () => {

    const [option, setOption] = useState(1)
    const [work, setWork] = useState(1)
    const navigation = useNavigate()

    const [sorteos, setSorteos] = useState([])

    useEffect(() => {
        axios.get("/sorteo/listar/all").then(({ data }) => setSorteos(data))
    }, [])

    return (
        <>
            <div>
                <div className="px-5 sm:px-20 lg:px-0 text-start flex flex-col-reverse pt-20 py-0 lg:py-32 lg:flex-row items-center justify-evenly min-h-[60vh]">
                    <motion.div initial={{ x: -100 }}
                        animate={{ x: 0 }}
                    >
                        {/* <h4 className="mb-4 font-bold">Participa y gana</h4> */}
                        {/* <h1 className="text-[60px] tracking-widest">PORTFOLIO</h1> */}
                        <h1 className="text-[35px] sm:text-[45px] lg:text-[65px] max-w-[40rem] leading-none font-extrabold">Aprovecha tu primer envío es <span className="font-extrabold bg-gradient-to-r from-orange-500 to-red-500 inline-block text-transparent bg-clip-text">GRATIS</span></h1>
                        <p className="max-w-[30rem] my-4 text-slate-600 dark:text-slate-300 text-lg">Si eres usuario nuevo no te cobraremos el envío de tu primer pedido <b>¿Que esperas para pedir?</b></p>
                        {/* <div className="flex items-center gap-3 bg-slate-100 dark:bg-[#262635] border-l-4 border-l-orange-400 rounded-r-sm pl-4 py-3">
                            <Gift className="w-8 h-8" />
                            <div>
                                <p className="font-bold">¡Estás de suerte!</p>
                                <p className="text-slate-500 dark:text-slate-400">Tenemos {sorteos?.length} sorteos activos</p>
                            </div>

                        </div> */}

                        <a href="#sorteos"><Button className="mt-8 text-sm sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-7 bg-gradient-to-r from-orange-500 to-red-500"><TicketCheck className="mr-2 w-5 h-5" />Pedir ahora!</Button></a>
                    </motion.div>
                    <motion.div initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="w-60 mb-10 lg:mb-0 sm:w-96 lg:w-1/3 relative flex justify-center lg:h-[400px]"
                    >
                        <div className="w-full h-full flex justify-center items-center">
                            <Lottie animationData={domicilio} style={{ width: "900px" }} loop={true} />
                        </div>
                        {/* <img src={webdev} className="absolute"/> */}
                    </motion.div>
                </div>
                <div id="sorteos" className="text-center flex items-center justify-evenly min-h-[100vh] h-fit bg-slate-50 dark:bg-[#14141A] mt-10 pb-20">
                    <div>
                        <h1 className="text-[30px] sm:text-[35px] lg:text-[50px] my-10 font-extrabold">Tiendas aliadas</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                            {tiendas.map((tienda, i)=> 
                            <div key={i} role="button" onClick={() => navigation(`/tienda/${tienda.id}`)} className="flex items-center w-80 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900">
                            <div className="rounded-lg m-4 w-28 h-28 overflow-hidden">
                                    <img src={tienda.imagen} alt="Imagen" className="object-cover h-full" />
                                </div>
                                <div className="text-left px-2">
                                    <h2 className="font-bold text-lg my-2">{tienda.nombre}</h2>
                                    {/* <p className="text-slate-500 mb-2">El mejor pollo de la ciudad</p> */}
                                    <div className="flex">
                                        <Timer className="w-4 h-4 text-slate-500 mr-1" />
                                        <p className="text-slate-500 text-sm mb-2">{tienda.estimado} min</p>
                                    </div>
                                    <Button onClick={() => navigation(`/tienda/${tienda.id}`)} className="h-7">Ver productos</Button>
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

export default Inicio