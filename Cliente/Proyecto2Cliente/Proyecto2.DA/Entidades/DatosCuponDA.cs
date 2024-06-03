using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.DA.Entidades
{
    [Table("DatosCupon")]
    public class DatosCuponDA
    {
        [Required]
        public int idCupon { get; set; }

        [Required]
        public int idCompra { get; set; }

        [Required]
        public decimal precio { get; set; }

        [Required]
        public decimal descuento { get; set; }

        [Required]
        public string imagenRepresentativa { get; set; } = null!;

        [Required]
        public string ubicacion { get; set; } = null!;

        [Required]
        public string empresa { get; set; } = null!;

        [Required]
        public string categoria { get; set; } = null!;

        [Required]
        public int cantidad { get; set; }

        [ForeignKey("idCompra")]
        public virtual CompraDA CompraAsociada { get; set; } = null!;
    }
}
