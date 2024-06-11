using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;

namespace Proyecto2Cliente.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly IGestionarCategoriaBW gestionarCategoriaBW;

        public CategoriaController(IGestionarCategoriaBW gestionarCategoriaBW)
        {
            this.gestionarCategoriaBW = gestionarCategoriaBW;
        }

        [HttpGet]

        public async Task<IEnumerable<Categoria>> obtengaTodasLasCategorias()
        {

            return await gestionarCategoriaBW.obtengaTodasLasCategorias();
        }
    }
}
