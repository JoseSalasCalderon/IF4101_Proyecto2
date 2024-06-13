using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.CU
{
    public class GestionarCompraBW : IGestionarCompraBW
    {
        private readonly IGestionarCompraDA gestionarCompraDA;

        public GestionarCompraBW(IGestionarCompraDA gestionarCompraDA)
        {
            this.gestionarCompraDA = gestionarCompraDA;
        }

        public async Task<Compra> CrearCompra(Compra compra)
        {
            return await gestionarCompraDA.crearCompra(compra);
        }

        public async Task<List<Compra>> ObtenerComprasPorUsuario(string correo)
        {
            return await gestionarCompraDA.ObtenerComprasPorUsuario(correo);
        }

        public async Task<List<CompraDatosCupon>> ObtenerCompraConDatosCupon(string correo)
        {
            return await gestionarCompraDA.ObtenerCompraConDatosCupon(correo);
        }

        public async Task<int> buscarIdDisponible()
        {
            return await gestionarCompraDA.buscarIdDisponible();
        }
    }
}
