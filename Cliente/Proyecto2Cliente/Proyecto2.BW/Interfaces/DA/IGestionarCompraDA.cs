using Proyecto2.BC.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.Interfaces.DA
{
    public interface IGestionarCompraDA
    {
        Task<Compra> crearCompra(Compra compra);
        Task<List<Compra>> ObtenerComprasPorUsuario(string cedula);
        Task<List<CompraDatosCupon>> ObtenerCompraConDatosCupon(string cedula);
    }
}
