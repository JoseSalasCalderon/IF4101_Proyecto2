using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BC.Modelos
{
    public class Cupon
    {
        public int idCupon { get; set; }
        public int idCategoria { get; set; }

        public string? nombreUsuario { get; set; }
        public string? nombreCategoria { get; set; }
        public string codigo { get; set; } = null!;
        public string nombre { get; set; } = null!;
        public string? nombreEmpresa { get; set; }
        public double precio { get; set; }
        public double? descuento { get; set; }
        public string? ubicacion { get; set; }
        public string? imagenRepresentativa { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFinalizacion { get; set; }
        public bool activo { get; set; }
    }
}
