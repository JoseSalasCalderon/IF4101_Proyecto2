using Proyecto2.BC.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.Interfaces.BW
{
    public interface IGestionarCompraBW
    {
        Task<Compra> CrearCompra(Compra compra);
        Task<List<Compra>> ObtenerComprasPorUsuario(string correo);
        Task<List<CompraDatosCupon>> ObtenerCompraConDatosCupon(string correo);
        Task<int> buscarIdDisponible();
    }
}
