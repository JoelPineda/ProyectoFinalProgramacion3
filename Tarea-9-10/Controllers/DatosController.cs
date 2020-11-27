using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tarea_9_10.Controllers
{
    public class DatosController : Controller
    {
        // GET: Datos
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Inicio()
        {
            return View();
        }
        DataClasses1DataContext db = new DataClasses1DataContext();
        public JsonResult listarDatos()
        {
            var usuario = User.Identity.Name;
            var lista = db.DATOS.Where(x => x.Usuario == usuario && x.DBHABILITADO.Equals(1)).
                Select(x => new
            {
                    x.Id,
                    x.Nombre,
                    x.Apellido,
                    x.Sexo,
                    x.Fecha,
                    x.Pais_Residencia_Actual,
                    x.Telefono,
                });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult listarRegistro()
        {
            var lista = db.Paises.Select(x => new
            {
                x.Nombre
            });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
       public JsonResult listarUsuario()
        {
            var usuario = User.Identity.Name;
            var lista = (db.AspNetUsers.Where(x => x.Email == usuario).
            Select(x => new
            {
                x.Email
            })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public int eliminar(DATOS datos)
        {
            int nregistrosAfectados = 0;
            try
            {
                int idRegistro = datos.Id;
                DATOS obj = db.DATOS.Where(p => p.Id.Equals(idRegistro)).First();
                obj.DBHABILITADO = 0;
                db.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch (Exception error)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

        public JsonResult buscarFeligrensePorNombre(string nombre)
        {
            var usuario = User.Identity.Name;
            var lista = (db.DATOS.Where(p => p.Usuario == usuario
            && p.Nombre.Contains(nombre) && p.DBHABILITADO.Equals(1))
                .Select(x => new {
                    x.Id,
                    x.Nombre,
                    x.Apellido,
                    x.Sexo,
                    x.Fecha,
                    x.Pais_Residencia_Actual,
                    x.Telefono,
                })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult recuperarInformacion(int id)
        {
            var lista = db.DATOS.Where(p => p.Id.Equals(id)).Select(
                p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Apellido,
                    p.Fecha,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    p.Pais,
                    p.Usuario,
                    p.Ciudad,
                    p.Pais_Residencia_Actual,
                    p.Ciudad_Residencia_Actual,
                    p.Direccion,
                    p.Telefono,
                    p.Celular,
                    p.Correo_electronico,
                    p.Documento_identidad,
                    p.Estado_Civil,
                    p.Nombre_Pareja,
                    p.Hijos,
                    p.N_Hijos,
                    p.Profesion,
                    p.Ocupacion_Actual,
                    p.Nombre_Empresa,
                    p.Telefono_Empresa,
                    p.Fecha_Conversion,
                    p.Fecha_Bautismo,
                    p.Fecha_Aceptado,
                    p.Denominacion_Pertenece,
                    p.Otra_denominacion,
                    p.Nombre_Iglesia,
                    p.Congregacion_Anterior,
                    p.Nombre_Pastor,
                    p.Diciplinado_algunaVez,
                    p.N_veces,
                    p.Causas,
                    p.Ocupacion_en_la_iglesia,
                    p.Ministerio_Servido,
                    p.Ministerio_Fruto,
                    p.Ministerio_Dios,
                    p.Meta_vida,
                    p.Eclesiastico_estudio,
                    p.Nivel_estudio,
                    p.Expulsado_Ins,
                    p.Razon
                }
                );
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public int guardarDatos(DATOS datos, string cadenaFoto)
        {
            DATOS obj = new DATOS();
            int nregistrosAfectados = 0;
            try
            {
                int idRegistro = datos.Id;
                if (idRegistro >= 1)
                {
                    //Editar registro
                    obj = db.DATOS.Where(p => p.Id.Equals(idRegistro)).First();
                    obj.Id = datos.Id;
                    obj.Nombre = datos.Nombre;
                    obj.Apellido = datos.Apellido;
                    obj.Foto = Convert.FromBase64String(cadenaFoto);
                    obj.Fecha = datos.Fecha;
                    obj.Pais = datos.Pais;
                    obj.Ciudad = datos.Ciudad;
                    obj.Pais_Residencia_Actual = datos.Pais_Residencia_Actual;
                    obj.Ciudad_Residencia_Actual = datos.Ciudad_Residencia_Actual;
                    obj.Direccion = datos.Direccion;
                    obj.Telefono = datos.Telefono;
                    obj.Celular = datos.Celular;
                    obj.Correo_electronico = datos.Correo_electronico;
                    obj.Documento_identidad = datos.Documento_identidad;
                    obj.Nombre_Pareja = datos.Nombre_Pareja;
                    obj.N_Hijos = datos.N_Hijos;
                    obj.Profesion = datos.Profesion;
                    obj.Ocupacion_Actual = datos.Ocupacion_Actual;
                    obj.Nombre_Empresa = datos.Nombre_Empresa;
                    obj.Telefono_Empresa = datos.Telefono_Empresa;
                    obj.Fecha_Conversion = datos.Fecha_Conversion;
                    obj.Fecha_Bautismo = datos.Fecha_Bautismo;
                    obj.Fecha_Aceptado = datos.Fecha_Aceptado;
                    obj.Otra_denominacion = datos.Otra_denominacion;
                    obj.Nombre_Iglesia = datos.Nombre_Iglesia;
                    obj.Congregacion_Anterior = datos.Congregacion_Anterior;
                    obj.Nombre_Pastor = datos.Nombre_Pastor;
                    obj.N_veces = datos.N_veces;
                    obj.Causas = datos.Causas;
                    obj.Usuario = datos.Usuario;
                    obj.Ministerio_Servido = datos.Ministerio_Servido;
                    obj.Ministerio_Fruto = datos.Ministerio_Fruto;
                    obj.Ministerio_Dios = datos.Ministerio_Dios;
                    obj.Meta_vida = datos.Meta_vida;
                    obj.Nivel_estudio = datos.Nivel_estudio;
                    obj.Razon = obj.Razon;
                    db.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                else
                {
                    //Nuevo registro 
                    datos.Foto = Convert.FromBase64String(cadenaFoto);
                    db.DATOS.InsertOnSubmit(datos);
                    db.SubmitChanges();
                    nregistrosAfectados = 1;
                }

            }
            catch (Exception error)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }
    }
}