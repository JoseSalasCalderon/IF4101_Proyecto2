using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.DA.Acciones;

namespace Proyecto2Cliente.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatosCuponController : ControllerBase
    {
        private readonly IGestionarDatosCuponBW gestionarDatosCuponBW;

        public DatosCuponController(IGestionarDatosCuponBW gestionarDatosCuponBW)
        {
            this.gestionarDatosCuponBW = gestionarDatosCuponBW;
        }

        [HttpPost]
        [Route("CrearDatosCupon")]
        public async Task<IActionResult> CrearDatosCupon([FromBody] DatosCupon datosCupon)
        {
            if (datosCupon == null)
            {
                return BadRequest("DatosCupon es null.");
            }

            var nuevoDatosCupon = await gestionarDatosCuponBW.crearDatosCupon(datosCupon);
            return Ok(nuevoDatosCupon);
        }
    }
}
