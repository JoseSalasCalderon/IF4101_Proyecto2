using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.CU;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.DA.Acciones;

namespace Proyecto2Cliente.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly IGestionarCompraDA gestionarCompraDA;

        public CompraController(IGestionarCompraDA gestionarCompraDA)
        {
            this.gestionarCompraDA = gestionarCompraDA;
        }

        [HttpPost]
        [Route("CrearCompra")]
        public async Task<IActionResult> CrearCompra([FromBody] Compra compra)
        {
            if (compra == null)
            {
                return BadRequest("Compra es null.");
            }

            var nuevaCompra = await gestionarCompraDA.crearCompra(compra);
            return Ok(nuevaCompra);
        }

        [HttpGet]
        [Route("ObtenerComprasPorUsuario/{cedula}")]
        public async Task<IActionResult> ObtenerComprasPorUsuario(string cedula)
        {
            try
            {
                var compras = await gestionarCompraDA.ObtenerComprasPorUsuario(cedula);
                if (compras == null || compras.Count == 0)
                {
                    return NotFound($"No se encontraron compras para el usuario con cédula: {cedula}");
                }

                return Ok(compras);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las compras del usuario: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("ObtenerCompraConDatosCupon/{cedula}")]
        public async Task<IActionResult> ObtenerCompraConDatosCupon(string cedula)
        {
            try
            {
                var result = await gestionarCompraDA.ObtenerCompraConDatosCupon(cedula);
                if (result == null || result.Count == 0)
                {
                    return NotFound($"No se encontraron compras con cupones para el usuario con cédula: {cedula}");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las compras con cupones del usuario: {ex.Message}");
            }
        }
    }
}
