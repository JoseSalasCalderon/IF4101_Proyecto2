using Proyecto2.BC.Constantes;
using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Proyecto2.SG
{
    public class GestionarCategoriaSG : IGestionarCategoriaSG
    {
        private readonly HttpClient clienteHttp;

        public GestionarCategoriaSG(HttpClient clienteHttp)
        {
            this.clienteHttp = clienteHttp;
        }

        public async Task<IEnumerable<Categoria>> obtengaTodasLasCategorias()
        {
            // Se hace la consulta al API respectiva mediante un URL
            HttpResponseMessage respuesta = await clienteHttp.GetAsync(URLCategoriasConstant.URL);

            if (!respuesta.IsSuccessStatusCode)
                throw new HttpRequestException($"Error en {URLCategoriasConstant.URL} al obtener el mensaje");

            // Se pasa la respuesta a string
            var content = await respuesta.Content.ReadAsStringAsync();

            // Se deserializa la respuesta para convertirla en JSON
            var jsonCategorias = JsonSerializer.Deserialize<JsonElement[]>(content);

            // Lista para almacenar los cupones mapeados
            List<Categoria> categorias = new List<Categoria>();

            foreach (var jsonCategoria in jsonCategorias)
            {
                Categoria categoria = new Categoria();

                categoria.idCategoria = jsonCategoria.GetProperty("idCategoria").GetInt32();
                categoria.nombreCategoria = jsonCategoria.TryGetProperty("nombreCategoria", out var nombreCategoria) ? nombreCategoria.GetString() : null;

                categorias.Add(categoria);
            }

            return categorias;
        }
    }
}
