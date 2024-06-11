using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.CU
{
    public class GestionarCategoriaBW : IGestionarCategoriaBW
    {
        private readonly IGestionarCategoriaSG gestionarCategoriaSG;

        public GestionarCategoriaBW(IGestionarCategoriaSG gestionarCategoriaSG)
        {
            this.gestionarCategoriaSG = gestionarCategoriaSG;
        }

        public async Task<IEnumerable<Categoria>> obtengaTodasLasCategorias()
        {
            return await gestionarCategoriaSG.obtengaTodasLasCategorias();
        }
    }
}
