using Microsoft.EntityFrameworkCore;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.DA.Contexto;
using Proyecto2.DA.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.DA.Acciones
{
    public class GestionarUsuarioDA : IGestionarUsuarioDA
    {
        private readonly Proyecto2Context proyecto2Context;

        public GestionarUsuarioDA(Proyecto2Context proyecto2Context)
        {
            this.proyecto2Context = proyecto2Context;
        }

        public async Task<Usuario> buscarUsuario(string correo, string contrasenna)
        {
            var usuarioDA = await proyecto2Context.UsuarioDA.FirstOrDefaultAsync(u => u.correo == correo && u.contrasenna == contrasenna);

            if (usuarioDA != null)
            {
                //Se puede usar new() sin llamar directamente al constructor
                Usuario usuario = new()
                {
                    idUsuario = usuarioDA.idUsuario,
                    cedula = usuarioDA.cedula,
                    nombre = usuarioDA.nombre,
                    apellidos = usuarioDA.apellidos,
                    fechaNacimiento = usuarioDA.fechaNacimiento,
                    correo = correo,
                    contrasenna = contrasenna
                };

                return usuario;
            }

            return null;
        }
    }
}
