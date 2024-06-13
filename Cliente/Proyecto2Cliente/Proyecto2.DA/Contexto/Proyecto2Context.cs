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
        public DbSet<DatosCuponDA> DatosCuponDA { get;set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DatosCuponDA>()
                .HasKey(dc => new { dc.idCupon, dc.idCompra });

            modelBuilder.Entity<DatosCuponDA>()
                .HasOne(dc => dc.CompraAsociada)
                .WithMany(c => c.DatosCupones)
                .HasForeignKey(dc => dc.idCompra);

            modelBuilder.Entity<CompraDA>()
                .HasOne(c => c.UsuarioAsociado)
                .WithMany(u => u.CompraDA)
                .HasForeignKey(c => c.correo);

            base.OnModelCreating(modelBuilder);
        }
    }
}
