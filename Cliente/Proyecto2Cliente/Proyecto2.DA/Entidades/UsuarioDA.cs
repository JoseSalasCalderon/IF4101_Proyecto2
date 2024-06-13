using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.DA.Entidades
{
    [Table("Usuario")]
    public class UsuarioDA
    {
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idUsuario { get; set; }

        [Required]
        [MaxLength(12)]
        public string cedula { get; set; }

        [Required]
        public string nombre { get; set; }

        [Required]
        public string apellidos { get; set; }

        [Required]
        public DateTime fechaNacimiento { get; set; }

        [Key]
        [Required]
        public string correo { get; set; }

        [Required]
        public string contrasenna { get; set; }

        public virtual ICollection<CompraDA> CompraDA { get; set; } = new List<CompraDA>();
    }
}
