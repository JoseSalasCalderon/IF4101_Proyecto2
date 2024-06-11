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

        public int idCupon { get; set; }
        public string cedula { get; set; } = null!;
        public decimal PrecioTotal { get; set; }
        public decimal DescuentoFinal { get; set; }
        public string ImagenRepresentativa { get; set; } = null!;
        public string Ubicacion { get; set; } = null!;
        public string Empresa { get; set; } = null!;
        public int Cantidad { get; set; }
    }
}
