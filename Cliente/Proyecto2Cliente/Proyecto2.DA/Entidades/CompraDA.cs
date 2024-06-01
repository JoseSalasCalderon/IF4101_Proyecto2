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
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idCompra { get; set; }

        [Required]
        public int idUsuario { get; set; }

        [Required]
        public int idCupon { get; set; }

        [Required]
        public int cantidad { get; set; }

        [Required]
        public string tarjeta { get; set; }

        [ForeignKey("idUsuario")]
        public virtual UsuarioDA UsuarioAsociado { get; set; } = null!;
    }
}
