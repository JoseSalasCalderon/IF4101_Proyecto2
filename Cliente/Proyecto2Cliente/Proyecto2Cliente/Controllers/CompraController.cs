using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.CU;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.DA.Acciones;

namespace Proyecto2Cliente.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly IGestionarCompraBW gestionarCompraBW;

        public CompraController(IGestionarCompraBW gestionarCompraBW)
        {
            this.gestionarCompraBW = gestionarCompraBW;
        }

        [HttpPost]
        [Route("CrearCompra")]
        public async Task<IActionResult> CrearCompra([FromBody] Compra compra)
        {
            if (compra == null)
            {
                return BadRequest("Compra es null.");
            }

            var nuevaCompra = await gestionarCompraBW.CrearCompra(compra);
            return Ok(nuevaCompra);
        }

        [HttpGet]
        [Route("ObtenerComprasPorUsuario/{correo}")]
        public async Task<IActionResult> ObtenerComprasPorUsuario(string correo)
        {
            try
            {
                var compras = await gestionarCompraBW.ObtenerComprasPorUsuario(correo);
                if (compras == null || compras.Count == 0)
                {
                    return NotFound($"No se encontraron compras para el usuario con cédula: {correo}");
                }

                return Ok(compras);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las compras del usuario: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("ObtenerCompraConDatosCupon/{correo}")]
        public async Task<IActionResult> ObtenerCompraConDatosCupon(string correo)
        {
            try
            {
                var result = await gestionarCompraBW.ObtenerCompraConDatosCupon(correo);
                if (result == null || result.Count == 0)
                {
                    return NotFound($"No se encontraron compras con cupones para el usuario con cédula: {correo}");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las compras con cupones del usuario: {ex.Message}");
            }
        }

        [HttpGet("buscarIdDisponible")]
        public async Task<int> buscarIdDisponible()
        {
            return await gestionarCompraBW.buscarIdDisponible();
        }
    }
}
