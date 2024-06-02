using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.CU
{
    public class GestionarUsuarioBW : IGestionarUsuarioBW
    {
        private readonly IGestionarUsuarioDA gestionarUsuarioDA;

        public GestionarUsuarioBW(IGestionarUsuarioDA gestionarUsuarioDA)
        {
            this.gestionarUsuarioDA = gestionarUsuarioDA;
        }

        public async Task<Usuario> buscarUsuario(string correo, string contrasenna)
        {
            return await gestionarUsuarioDA.buscarUsuario(correo, contrasenna);
        }

    }
}
