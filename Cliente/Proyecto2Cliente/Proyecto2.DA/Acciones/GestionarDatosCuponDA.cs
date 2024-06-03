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
    public class GestionarDatosCuponDA : IGestionarDatosCuponDA
    {
        private readonly Proyecto2Context proyecto2Context;

        public GestionarDatosCuponDA(Proyecto2Context proyecto2Context)
        {
            this.proyecto2Context = proyecto2Context;
        }

        public async Task<DatosCupon> crearDatosCupon(DatosCupon datosCupon)
        {
            DatosCuponDA datosCuponDA = new()
            {
                idCupon = datosCupon.idCupon,
                idCompra = datosCupon.idCompra,
                precio = datosCupon.precio,
                descuento = datosCupon.descuento,
                imagenRepresentativa = datosCupon.imagenRepresentativa,
                ubicacion = datosCupon.ubicacion,
                empresa = datosCupon.empresa,
                categoria = datosCupon.categoria,
                cantidad = datosCupon.cantidad
            };

            await proyecto2Context.DatosCuponDA.AddAsync(datosCuponDA);
            await proyecto2Context.SaveChangesAsync();

            datosCupon.idCompra = datosCuponDA.idCompra;

            return datosCupon;
        }
    }
}
