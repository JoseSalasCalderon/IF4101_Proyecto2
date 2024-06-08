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
                cedula = compra.cedula,
                precioTotal = compra.precioTotal,
                descuentoFinal = compra.descuentoFinal,
                tarjeta = compra.tarjeta
            };

            await proyecto2Context.CompraDA.AddAsync(compraDA);
            await proyecto2Context.SaveChangesAsync();

            compra.idCompra = compraDA.idCompra; 

            return compra;
        }

        public async Task<List<Compra>> ObtenerComprasPorUsuario(string cedula)
        {
            var compras = await proyecto2Context.CompraDA
                                                .Where(c => c.cedula == cedula)
                                                .ToListAsync();

            var comprasConvertidas = compras.Select(c => new Compra
            {
                idCompra = c.idCompra,
                cedula = c.cedula,
                precioTotal = c.precioTotal,
                descuentoFinal = c.descuentoFinal,
                tarjeta = c.tarjeta
            }).ToList();

            return comprasConvertidas;
        }

        public async Task<List<CompraDatosCupon>> ObtenerCompraConDatosCupon(string cedula)
        {
            var result = await proyecto2Context.CompraDA
                .Where(c => c.cedula == cedula)
                .SelectMany(c => c.DatosCupones.Select(dc => new CompraDatosCupon
                {
                    idCompra = dc.idCompra,
                    cedula = c.cedula,
                    PrecioTotal = c.precioTotal,
                    DescuentoFinal = c.descuentoFinal,
                    ImagenRepresentativa = dc.imagenRepresentativa,
                    Ubicacion = dc.ubicacion,
                    Empresa = dc.empresa,
                    Cantidad = dc.cantidad
                }))
                .ToListAsync();

            return result;
        }

    }
}
