using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;

namespace Proyecto2Cliente.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IGestionarUsuarioBW gestionarUsuarioBW;

        public UsuarioController(IGestionarUsuarioBW gestionarUsuarioBW)
        {
            this.gestionarUsuarioBW = gestionarUsuarioBW;
        }

        [HttpGet("BuscarUsuario")]
        public async Task<Usuario> buscarUsuario(string correo, string contrasenna)
        {
            return await gestionarUsuarioBW.buscarUsuario(correo, contrasenna);
        }

        [HttpPost("RegistrarUsuario")]
        public async Task<bool> registrarUsuario(Usuario usuario)
        {
            return await gestionarUsuarioBW.registrarUsuario(usuario);
        }
    }
}
