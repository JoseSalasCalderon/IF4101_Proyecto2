using Proyecto2.BC.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto2.BW.Interfaces.SG
{
    public interface IGestionarCuponSG
    {
        Task<IEnumerable<Cupon>> obtengaTodosLosCupones();
    }
}
