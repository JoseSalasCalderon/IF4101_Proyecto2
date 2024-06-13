using Microsoft.EntityFrameworkCore;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.DA.Contexto;
using Proyecto2.DA.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.DA.Acciones
{
    public class GestionarCompraDA : IGestionarCompraDA
    {
        private readonly Proyecto2Context proyecto2Context;

        public GestionarCompraDA(Proyecto2Context proyecto2Context)
        {
            this.proyecto2Context = proyecto2Context;
        }

        public async Task<Compra> crearCompra(Compra compra)
        {
            CompraDA compraDA = new()
            {
                idCompra = compra.idCompra,
                correo = compra.correo,
                precioTotal = compra.precioTotal,
                descuentoFinal = compra.descuentoFinal,
                tarjeta = compra.tarjeta
            };

            await proyecto2Context.CompraDA.AddAsync(compraDA);
            await proyecto2Context.SaveChangesAsync();

            compra.idCompra = compraDA.idCompra; 

            return compra;
        }

        public async Task<List<Compra>> ObtenerComprasPorUsuario(string correo)
        {
            var compras = await proyecto2Context.CompraDA
                                                .Where(c => c.correo == correo)
                                                .ToListAsync();

            var comprasConvertidas = compras.Select(c => new Compra
            {
                idCompra = c.idCompra,
                correo = c.correo,
                precioTotal = c.precioTotal,
                descuentoFinal = c.descuentoFinal,
                tarjeta = c.tarjeta
            }).ToList();

            return comprasConvertidas;
        }

        public async Task<List<CompraDatosCupon>> ObtenerCompraConDatosCupon(string correo)
        {
            var result = await proyecto2Context.CompraDA
                .Where(c => c.correo == correo)
                .Select(c => new CompraDatosCupon
                {
                    idCompra = c.idCompra,
                    correo = c.correo,
                    precioTotal = c.precioTotal,
                    descuentoFinal = c.descuentoFinal,
                    tarjeta = c.tarjeta,
                    Cupones = c.DatosCupones.Select(dc => new DatosCupon
                    {
                        idCupon = dc.idCupon,
                        idCompra = dc.idCompra,
                        precio = dc.precio,
                        descuento = dc.descuento,
                        imagenRepresentativa = dc.imagenRepresentativa,
                        ubicacion = dc.ubicacion,
                        empresa = dc.empresa,
                        categoria = dc.categoria,
                        cantidad = dc.cantidad
                    }).ToList()
                })
                .ToListAsync();

            return result;
        }

        public async Task<int> buscarIdDisponible()
        {
            int maxIdReserva = await proyecto2Context.CompraDA
            .MaxAsync(r => (int?)r.idCompra) ?? 0; // Devuelve 0 si no hay registros

            int nuevoIdCompra = maxIdReserva + 1;
            return nuevoIdCompra;
        }

    }
}
