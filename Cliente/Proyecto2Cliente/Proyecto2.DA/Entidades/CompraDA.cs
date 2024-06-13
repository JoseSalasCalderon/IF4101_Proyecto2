using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.DA.Entidades
{
    [Table("Compra")]
    public class CompraDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        public int idCompra { get; set; }

        [Required]
        [MaxLength(30)]
        public string correo { get; set; } = null!; 

        [Required]
        public decimal precioTotal { get; set; } 

        [Required]
        public decimal descuentoFinal { get; set; } 

        [Required]
        public string tarjeta { get; set; } = null!; 

        [ForeignKey("correo")]
        public virtual UsuarioDA UsuarioAsociado { get; set; } = null!;

        public virtual ICollection<DatosCuponDA> DatosCupones { get; set; } = new List<DatosCuponDA>();
    }
}
