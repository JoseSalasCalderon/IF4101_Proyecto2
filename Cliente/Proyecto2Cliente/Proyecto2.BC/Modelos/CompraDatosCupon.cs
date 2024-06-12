using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BC.Modelos
{
    public class CompraDatosCupon
    {
        public int idCompra { get; set; }
        public string cedula { get; set; } = null!;
        public decimal precioTotal { get; set; }
        public decimal descuentoFinal { get; set; }
        public string tarjeta { get; set; } = null!;

        // Arreglo de datos cupon
        public List<DatosCupon> Cupones { get; set; } = new List<DatosCupon>();
    }
}
