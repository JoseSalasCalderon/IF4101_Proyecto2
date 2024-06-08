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
    public class GestionarDatosCuponBW : IGestionarDatosCuponBW
    {
        private readonly IGestionarDatosCuponDA gestionarDatosCuponDA;

        public GestionarDatosCuponBW(IGestionarDatosCuponDA gestionarDatosCuponDA)
        {
            this.gestionarDatosCuponDA = gestionarDatosCuponDA;
        }

        public async Task<DatosCupon> crearDatosCupon(DatosCupon datosCupon)
        {
            return await gestionarDatosCuponDA.crearDatosCupon(datosCupon);
        }
    }
}
