using Proyecto2.BC.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.Interfaces.BW
{
    public interface IGestionarUsuarioBW
    {
        Task<Usuario> buscarUsuario(string correo, string contrasenna);

        Task<bool> registrarUsuario(Usuario usuario);
    }
}
