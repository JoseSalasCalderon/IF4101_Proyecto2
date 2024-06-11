using Proyecto2.BC.Constantes;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Proyecto2.SG
{
    public class GestionarCuponSG : IGestionarCuponSG
    {
        private readonly HttpClient clienteHttp;

        public GestionarCuponSG(HttpClient clienteHttp)
        {
            this.clienteHttp = clienteHttp;
        }

        public async Task<IEnumerable<Cupon>> obtengaTodosLosCupones()
        {
            // Se hace la consulta al API respectiva mediante un URL
            HttpResponseMessage respuesta = await clienteHttp.GetAsync(URLCuponesConstant.URL);

            if (!respuesta.IsSuccessStatusCode)
                throw new HttpRequestException($"Error en {URLCuponesConstant.URL} al obtener el mensaje");

            // Se pasa la respuesta a string
            var content = await respuesta.Content.ReadAsStringAsync();

            // Se deserializa la respuesta para convertirla en JSON
            var jsonCupones = JsonSerializer.Deserialize<JsonElement[]>(content);

            // Lista para almacenar los cupones mapeados
            List<Cupon> cupones = new List<Cupon>();

            foreach (var jsonCupon in jsonCupones)
            {
                Cupon cupon = new Cupon();

                cupon.idCupon = jsonCupon.GetProperty("idCupon").GetInt32();
                cupon.idCategoria = jsonCupon.GetProperty("idCategoria").GetInt32();
                cupon.nombreCategoria = jsonCupon.TryGetProperty("nombreCategoria", out var nombreCategoria) ? nombreCategoria.GetString() : null;
                cupon.nombreUsuario = jsonCupon.TryGetProperty("nombreUsuario", out var nombreUsuario) ? nombreUsuario.GetString() : null;
                cupon.nombreEmpresa = jsonCupon.TryGetProperty("nombreEmpresa", out var nombreEmpresa) ? nombreEmpresa.GetString() : null;
                cupon.codigo = jsonCupon.GetProperty("codigo").GetString();
                cupon.nombre = jsonCupon.GetProperty("nombre").GetString();
                cupon.precio = double.Parse(jsonCupon.GetProperty("precio").GetString(), CultureInfo.InvariantCulture);
                cupon.descuento = double.Parse(jsonCupon.GetProperty("descuento").GetString(), CultureInfo.InvariantCulture);
                cupon.ubicacion = jsonCupon.TryGetProperty("ubicacion", out var ubicacion) ? ubicacion.GetString() : null;
                cupon.imagenRepresentativa = jsonCupon.TryGetProperty("imagenRepresentativa", out var imagenRepresentativa) ? imagenRepresentativa.GetString() : null;
                cupon.fechaCreacion = DateTime.Parse(jsonCupon.GetProperty("fechaCreacion").GetString());
                cupon.fechaInicio = DateTime.Parse(jsonCupon.GetProperty("fechaInicio").GetString());
                cupon.fechaFinalizacion = DateTime.Parse(jsonCupon.GetProperty("fechaFinalizacion").GetString());
                if(jsonCupon.GetProperty("activo").GetInt16() == 1)
                {
                    cupon.activo = true;
                }
                else
                {
                    cupon.activo = false;
                }
               


                cupones.Add(cupon);
            }

            return cupones;
        }
    }
}
