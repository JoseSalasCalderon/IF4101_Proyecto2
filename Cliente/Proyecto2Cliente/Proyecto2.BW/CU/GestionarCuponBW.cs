using Proyecto2.BC.Modelos;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.CU
{
    public class GestionarCuponBW : IGestionarCuponBW
    {
        private readonly IGestionarCuponSG gestionarCuponSG;

        public GestionarCuponBW(IGestionarCuponSG gestionarCuponSG)
        {
            this.gestionarCuponSG = gestionarCuponSG;
        }

        public async Task<IEnumerable<Cupon>> obtengaTodosLosCupones()
        {
            return await gestionarCuponSG.obtengaTodosLosCupones();
        }
    }
}
