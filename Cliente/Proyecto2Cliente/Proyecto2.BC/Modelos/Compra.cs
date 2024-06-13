using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BC.Modelos
{
    public class Compra
    {
        public int idCompra { get; set; }
        public string correo { get; set; } = null!;
        public decimal precioTotal { get; set; }
        public decimal descuentoFinal { get; set; }
        public string tarjeta { get; set; } = null!;
    }
}
