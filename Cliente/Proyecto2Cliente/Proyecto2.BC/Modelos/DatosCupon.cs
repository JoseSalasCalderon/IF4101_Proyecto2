using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BC.Modelos
{
    public class DatosCupon
    {
        public int idCupon { get; set; }
        public int idCompra { get; set; }
        public decimal precio { get; set; }
        public decimal descuento { get; set; }
        public string imagenRepresentativa { get; set; } = null!;
        public string ubicacion { get; set; } = null!;
        public string empresa { get; set; } = null!;
        public string categoria { get; set; } = null!;
        public int cantidad { get; set; }
    }
}
