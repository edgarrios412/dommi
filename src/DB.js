export const tiendas = [
  {
    id: 0,
    imagen: "/tiendas/0/logo.png",
    nombre: "Doritos",
    estimado: 15,
    productos: [
      {
        id: 0,
        nombre: "Doritos 350gr",
        imagen: "/tiendas/0/0.jpg",
        precio: 1.5,
      },
      {
        id: 1,
        nombre: "Doritos 500gr",
        imagen: "/tiendas/0/0.jpg",
        precio: 1.5,
      },
      {
        id: 2,
        nombre: "Doritos 1kg",
        imagen: "/tiendas/0/0.jpg",
        precio: 1.5,
      },
    ],
  },
  {
    id: 1,
    imagen: "/tiendas/1/logo.jpg",
    nombre: "Frisby",
    estimado: 15,
    productos: [
      {
        id: 0,
        nombre: "Alitas de pollo",
        imagen: "/tiendas/1/0.jpg",
        precio: 2.5,
      },
    ],
  },
  {
    id: 2,
    imagen: "/tiendas/2/logo.jpg",
    nombre: "Pa que tatalo",
    estimado: 10,
    productos: [],
  }
];

export const carrito = [{
  tiendaId:0,
  productoId:0,
  cantidad:1
}]

const agregarProducto = (producto) => {
  const productoEncontrado = carrito.find(c => c.tiendaId == producto.tiendaId && c.productoId == producto.id)
  if(productoEncontrado){
    productoEncontrado
  }else{

  }
}
