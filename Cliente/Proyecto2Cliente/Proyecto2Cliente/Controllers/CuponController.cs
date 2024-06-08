using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.CU;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;

namespace Proyecto2Cliente.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuponController : ControllerBase
    {
        private readonly IGestionarCuponBW gestionarCuponBW;

        public CuponController(IGestionarCuponBW gestionarCuponBW)
        {
            this.gestionarCuponBW = gestionarCuponBW;
        }

        [HttpGet]

        public async Task<IEnumerable<Cupon>> obtenerTodosLosCupones()
        {

            return await gestionarCuponBW.obtengaTodosLosCupones();
        }
    }
}
