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
        private readonly IGestionarDatosCuponDA gestionarDatosCuponDA;

        public DatosCuponController(IGestionarDatosCuponDA gestionarDatosCuponDA)
        {
            this.gestionarDatosCuponDA = gestionarDatosCuponDA;
        }

        [HttpPost]
        [Route("CrearDatosCupon")]
        public async Task<IActionResult> CrearDatosCupon([FromBody] DatosCupon datosCupon)
        {
            if (datosCupon == null)
            {
                return BadRequest("DatosCupon es null.");
            }

            var nuevoDatosCupon = await gestionarDatosCuponDA.crearDatosCupon(datosCupon);
            return Ok(nuevoDatosCupon);
        }
    }
}
