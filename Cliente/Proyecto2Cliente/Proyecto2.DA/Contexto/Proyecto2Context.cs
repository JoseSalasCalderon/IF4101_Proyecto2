using Microsoft.EntityFrameworkCore;
using Proyecto2.DA.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.DA.Contexto
{
    public class Proyecto2Context : DbContext
    {
        public Proyecto2Context(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<UsuarioDA> UsuarioDA { get; set; }
        public DbSet<CompraDA> CompraDA { get; set; }


    }
}
