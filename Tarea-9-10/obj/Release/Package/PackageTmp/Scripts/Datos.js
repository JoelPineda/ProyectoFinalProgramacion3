listar();


var buscar = document.getElementById("txtBuscar");
buscar.onkeyup = function () {
    var nombrePeriodo = document.getElementById("txtBuscar").value;
    $.get("Datos/buscarFeligrensePorNombre/?nombre=" + nombrePeriodo, function (data) {
        listarDatos(["ID", "Nombre","Apellido", "Sexo", "Fecha Nacimiento","Pais", "Telefono" ], data);
    });
}

$("#txtFecha").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeMonth: true,
        changeYear: true
    }
);

$("#txtFechaCon").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeMonth: true,
        changeYear: true
    }
);

$("#txtFechabau").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeMonth: true,
        changeYear: true
    }
);

$("#txtFechaAceptado").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeMonth: true,
        changeYear: true
    }
);


function listar() {
    $.get("Datos/listarDatos", function (data) {
        listarDatos(["ID", "Nombre", "Apellido", "Sexo", "Fecha Nacimiento", "Pais", "Telefono"], data);
    });
}

function listarDatos(ArrayColumna, data) {
    var contenido = "";

    contenido += "<table id='tablas' class='table table-bordered table-hover'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < ArrayColumna.length; i++) {
        contenido += "<td  class='p-3 mb-2 bg-primary text-white'>";
        contenido += ArrayColumna[i];
        contenido += "</td>";
    }
    contenido += "<td class='p-3 mb-2 bg-primary text-white'>ACCCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var llaves = Object.keys(data[0])
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLlaves = llaves[j];
            contenido += "<td class='text-primary'>"
            contenido += data[i][valorLlaves];
            contenido += "</td>"
        }
        var llavesId = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llavesId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llavesId] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("secretos").innerHTML = contenido;
    $("#tablas").DataTable({
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        },
        responsive: "true",
        dom: 'Bfrtilp',
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger'
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
        ],	
        searching: true

    });
}



function abrirModal(Id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var nControles = controlesObligatorio.length;

    for (var i = 0; i < nControles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    if (Id == 0) {
        limpiarDatos();
    } else {
        $.get("Datos/recuperarInformacion/?id=" + Id, function (data) {

            document.getElementById("txtId").value = data[0].Id;
            document.getElementById("txtNombre").value = data[0].Nombre;
            document.getElementById("txtApellido").value = data[0].Apellido;
            document.getElementById("imgFoto").src = "data:image/jpeg;base64," + data[0].FOTOMOSTRAR;
            document.getElementById("txtFecha").value = data[0].Fecha;
            document.getElementById("txtPaisN").value = data[0].Pais;
            document.getElementById("txtCiudadN").value = data[0].Ciudad;
            document.getElementById("txtPaisA").value = data[0].Pais_Residencia_Actual;
            document.getElementById("txtCiudadA").value = data[0].Ciudad_Residencia_Actual;
            document.getElementById("txtDireccion").value = data[0].Direccion;
            document.getElementById("txtTelefonoP").value = data[0].Telefono;
            document.getElementById("txtCelularC").value = data[0].Celular;
            document.getElementById("txtCorreo").value = data[0].Correo_electronico;
            document.getElementById("txtUsuario").value = data[0].Usuario;
            document.getElementById("txtFechaCon").value = data[0].Fecha_Conversion;
            document.getElementById("txtFechabau").value = data[0].Fecha_Bautismo;
            document.getElementById("txtFechaAceptado").value = data[0].Fecha_Aceptado;
            document.getElementById("documentoI").value = data[0].Documento_identidad;
            //Recuperar Datos Familiares
            document.getElementById("nombrepa").value = data[0].Nombre_Pareja;
            document.getElementById("txtHijos").value = data[0].N_Hijos;

            //Recuperar Datos laborales
            document.getElementById("Profesion").value = data[0].Profesion;
            document.getElementById("txtOActual").value = data[0].Ocupacion_Actual;
            document.getElementById("txtEmpresa").value = data[0].Nombre_Empresa;
            document.getElementById("txtTelefonoT").value = data[0].Telefono_Empresa;

            //Recuperar Datos eclesiaticos
            document.getElementById("txtFechaCon").value = data[0].Fecha_Conversion;
            document.getElementById("txtFechabau").value = data[0].Fecha_Bautismo;
            document.getElementById("txtFechaAceptado").value = data[0].Fecha_Aceptado;
            document.getElementById("txtOtra").value = data[0].Otra_denominacion;
            document.getElementById("txtNombreIglesia").value = data[0].Nombre_Iglesia;
            document.getElementById("txtCongrebaAn").value = data[0].Congregacion_Anterior;
            document.getElementById("txtNpastorActu").value = data[0].Nombre_Pastor;
            document.getElementById("txtDisciplinado").value = data[0].N_veces;
            document.getElementById("txtCausasDI").value = data[0].Causas;
            document.getElementById("txtMinisteriosS").value = data[0].Ministerio_Servido;
            document.getElementById("mayorFruto").value = data[0].Ministerio_Fruto;
            document.getElementById("DonesTalento").value = data[0].Ministerio_Dios;
            document.getElementById("txtMetaVida").value = data[0].Meta_vida;

            //Recuperar Datos Academicos
            document.getElementById("txtEstudio").value = data[0].Nivel_estudio;
            document.getElementById("txtrazonEx").value = data[0].Razon;

        });
    }
}

function Agregar() {

    if (DatosObligatorio() == true) {
        var frm = new FormData();

        var Id = document.getElementById("txtId").value;
        var Nombre = document.getElementById("txtNombre").value;
        var Apellido = document.getElementById("txtApellido").value;
        var foto = document.getElementById("imgFoto").src.replace("data:image/jpeg;base64,", "");
        var arrSexo = new Array();
        var SelectSexo = $('input[id="txtSexo"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrSexo.push(item);
        });
        const SexoS = arrSexo.find(sexol => sexol.status == true);
        sexo = SexoS.id;
        var Fecha = document.getElementById("txtFecha").value;
        var PaisNaci = document.getElementById("txtPaisN").value;
        var CiudadNaci = document.getElementById("txtCiudadN").value;
        var PaisActua = document.getElementById("txtPaisA").value;
        var CiudaActua = document.getElementById("txtCiudadA").value;
        var Direccion = document.getElementById("txtDireccion").value;
        var TelefonoPer = document.getElementById("txtTelefonoP").value;
        var CecularC = document.getElementById("txtCelularC").value;
        var Correo = document.getElementById("txtCorreo").value;
        var documento = document.getElementById("documentoI").value;
        var Usuario = document.getElementById("txtUsuario").value;
        var arrTodo = new Array();
        var tipoDoc = $('input[class="tipoD"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrTodo.push(item);
        });
        const found = arrTodo.find(tipod => tipod.status == true);
        dato = found.id;
        //Estado Civil
        var arrTodoC = new Array();
        var EstadoCivil = $('input[class="EstadoCivil"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrTodoC.push(item);
        });

        const estadoc = arrTodoC.find(estadocc => estadocc.status == true);
        dataEstado = estadoc.id;
        var EstadoCivils = document.getElementById("nombrepa").value;
        //Hijos 
        var arrHijosc = new Array();
        var hijosd = $('input[class="hijos"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrHijosc.push(item);
        });

        const nhijos = arrHijosc.find(hijoc => hijoc.status == true);
        dataHijos = nhijos.id;
        var numeroHijos = document.getElementById("txtHijos").value;

        //Datos Laborales
        var profesion = document.getElementById("Profesion").value;
        var OcupacionActual = document.getElementById("txtOActual").value;
        var NombreEmpresa = document.getElementById("txtEmpresa").value;
        var TelefonoEmpresa = document.getElementById("txtTelefonoT").value

        //Datos Eclesiaticos
        var FechaConversion = document.getElementById("txtFechaCon").value;
        var FechaBautismo = document.getElementById("txtFechabau").value;
        var FechaAceptado = document.getElementById("txtFechaAceptado").value;
        var OtraDenominacion = document.getElementById("txtOtra").value;
        var NombreIglesia = document.getElementById("txtNombreIglesia").value;
        var arrIglesiac = new Array();
        var IglesiaD = $('input[class="DenominacionP"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrIglesiac.push(item);
        });

        const eIglesia = arrIglesiac.find(iglesia => iglesia.status == true);
        dataIglesia = eIglesia.id;

        var CongregacionAntes = document.getElementById("txtCongrebaAn").value;
        var PastorActual = document.getElementById("txtNpastorActu").value;

        var arrDiscic = new Array();
        var disciplinaD = $('input[class="displinado"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrDiscic.push(item);
        });

        const ndisciplina = arrDiscic.find(displic => displic.status == true);
        dataDisci = ndisciplina.id;
        var NumeroVdiscipl = document.getElementById("txtDisciplinado").value;
        var CausaDispl = document.getElementById("txtCausasDI").value;

        var arrFunciones = new Array();
        var FuncionesP = $('input[id="FuncionesOcu"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrFunciones.push(item);
        });

        const AFunciones = arrFunciones.find(funci => funci.status == true);
        ActualidaFunc = AFunciones.id;

        var MinisterioServ = document.getElementById("txtMinisteriosS").value;
        var MayorFruto = document.getElementById("mayorFruto").value;
        var DonesTalento = document.getElementById("DonesTalento").value;
        var MetaVida = document.getElementById("txtMetaVida").value;

        var arrAuCles = new Array();
        var AutoridadesECC = $('input[id="SA"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrAuCles.push(item);
        });

        const AutoridadesEcleSs = arrAuCles.find(autorid => autorid.status == true);
        AutoridadesReEs = AutoridadesEcleSs.id;

        //Datos Academicos
        var EstudioAcademico = document.getElementById("txtEstudio").value;
        var arrSuspendidoI = new Array();
        var SuspendidoIns = $('input[class="siRazonI"]').each(function (element) {
            var item = {};
            item.id = this.value;
            item.status = this.checked;
            arrSuspendidoI.push(item);
        });

        const SuspendidoINST = arrSuspendidoI.find(suspen => suspen.status == true);
        SuspendidoInstitucion = SuspendidoINST.id;

        var RazonExpuls = document.getElementById("txtrazonEx").value;


        frm.append("Id", Id);
        frm.append("Nombre", Nombre);
        frm.append("Apellido", Apellido);
        frm.append("CADENAFOTO", foto);
        frm.append("Sexo", sexo);
        frm.append("Fecha", Fecha);
        frm.append("Pais", PaisNaci);
        frm.append("Ciudad", CiudadNaci);
        frm.append("Pais_Residencia_Actual", PaisActua);
        frm.append("Ciudad_Residencia_Actual", CiudaActua);
        frm.append("Direccion", Direccion);
        frm.append("Telefono", TelefonoPer);
        frm.append("Celular", CecularC);
        frm.append("Correo_electronico", Correo);
        frm.append("Documento_identidad", documento);
        frm.append("Usuario", Usuario);
        frm.append("Tipo_documento", dato);
        frm.append("Estado_Civil", dataEstado);
        frm.append("Nombre_Pareja", EstadoCivils);
        frm.append("Hijos", dataHijos);
        frm.append("N_Hijos", numeroHijos);
        frm.append("Profesion", profesion);
        frm.append("Ocupacion_Actual", OcupacionActual);
        frm.append("Nombre_Empresa", NombreEmpresa);
        frm.append("Telefono_Empresa", TelefonoEmpresa);
        frm.append("Fecha_Conversion", FechaConversion);
        frm.append("Fecha_Bautismo", FechaBautismo);
        frm.append("Fecha_Aceptado", FechaAceptado);
        frm.append("Denominacion_Pertenece", dataIglesia);
        frm.append("Otra_denominacion", OtraDenominacion);
        frm.append("Nombre_Iglesia", NombreIglesia);
        frm.append("Congregacion_Anterior", CongregacionAntes);
        frm.append("Nombre_Pastor", PastorActual);
        frm.append("Diciplinado_algunaVez", dataDisci);
        frm.append("N_veces", NumeroVdiscipl);
        frm.append("Causas", CausaDispl);
        frm.append("Ocupacion_en_la_iglesia", ActualidaFunc);
        //Continuando Agregando
        frm.append("Ministerio_Servido", MinisterioServ);
        frm.append("Ministerio_Fruto", MayorFruto);
        frm.append("Ministerio_Dios", DonesTalento);
        frm.append("Meta_vida", MetaVida);
        frm.append("Eclesiastico_estudio", AutoridadesReEs);
        //Agregando datos Academicos
        frm.append("Nivel_estudio", EstudioAcademico);
        frm.append("Expulsado_Ins", SuspendidoInstitucion);
        frm.append("Razon", RazonExpuls);
        frm.append("DBHABILITADO", 1);

        if (confirm("Estas seguros que quieres agregar?") == 1) {
            $.ajax({
                type: "POST",
                url: "Datos/guardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("Ha ocurrido un error!", "Presione Ok!", "warning");
                    } else {
                        swal("Se agrego correctamente!", "Presione Ok!", "success");
                        listar();
                        document.getElementById("btnCancelar").click();
                    }
                }
            })
        }
    }
}

$.get("Datos/listarUsuario", function (data) {
    llenarComboxUsuario(data, document.getElementById("txtUsuario"), true);
});
function llenarComboxUsuario(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value = '" + data[i].Email + "'>";
            contenido += data[i].Email
            contenido += "</option>";
        }
    }

    control.innerHTML = contenido;
}



$.get("Datos/listarRegistro", function (data) {
    llenarCombox(data, document.getElementById("txtPaisN"), true);
    llenarCombox(data, document.getElementById("txtPaisA"), true);
});
function llenarCombox(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--seleccione--</option>";

    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value = '" + data[i].Nombre + "'>";
        contenido += data[i].Nombre
        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

function DatosObligatorio() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var nControles = controlesObligatorio.length;
    for (var i = 0; i < nControles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        } else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
function limpiarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var nControles = controles.length;
    for (var i = 0; i < nControles; i++) {
        controles[i].value = "";
    }
}

function eliminar(id) {
    var frm = new FormData();
    frm.append("Id", id);
    if (confirm("¿Realmente deseas eliminar el curso") == 1) {
        $.ajax({
            type: "POST",
            url: "Datos/eliminar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 0) {
                    swal("Ocurrio un error!", "Presione Ok!", "success");
                } else {
                    listar();
                    swal("Se elimino correctamente!", "Presione Ok!", "success");
                    document.getElementById("btnCancelar").click();
                }
            }
        });
    }

    
}

document.getElementById("empresa").style.display = "none";
document.getElementById("personal").style.display = "block";
document.getElementById("empresa2").style.display = "none";
document.getElementById("academico").style.display = "none";
document.getElementById("eclesiasticos2").style.display = "none";

function cambiaVisibilidad() {
    var div1 = document.getElementById("empresa");
    var div2 = document.getElementById("personal");
    var div3 = document.getElementById("empresa2");
    var div4 = document.getElementById("academico");
    var div5 = document.getElementById("eclesiasticos2");
    if (div2.style.display == 'block') {
        div1.style.display = 'block';
        div2.style.display = 'none';
    }
    else if (div1.style.display == 'block') {
        div1.style.display = "none";
        div3.style.display = "block";
    }
    else if (div3.style.display == "block") {
        div3.style.display = "none";
        div5.style.display = "block";
    }
    else if (div4.style.display == "none") {
        div5.style.display = "none";
        div4.style.display = "block";
    }
}

function cambiaVisibilidad2() {
    var div1 = document.getElementById("empresa");
    var div2 = document.getElementById("personal");
    var div3 = document.getElementById("empresa2");
    var div4 = document.getElementById("academico");
    var div5 = document.getElementById("eclesiasticos2");

    if (div4.style.display == "block") {
        div4.style.display = "none";
        div5.style.display = "block";
    }
    else if (div5.style.display == 'block') {
        div3.style.display = 'block';
        div5.style.display = 'none';
    }
    else if (div3.style.display == 'block') {
        div3.style.display = "none";
        div1.style.display = "block";
    }
    else if (div1.style.display == "block") {
        div1.style.display = "none";
        div2.style.display = "block";
    }
}

function showContent() {
    element = document.getElementById("txtHijo");
    check = document.getElementById("si");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}
function showContent2() {
    element = document.getElementById("razon");
    check = document.getElementById("siRazon");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}

function showContent3() {
    element = document.getElementById("documento");
    check = document.getElementById("cedula");
    check2 = document.getElementById("pasaporte");
    check3 = document.getElementById("dni");
    if (check.checked) {
        element.style.display = 'block';
    }
    else if (check2.checked) {
        element.style.display = 'block';
    }
    else if (check3.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}


function showContent4() {
    element = document.getElementById("documentopare");
    check = document.getElementById("casado");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}

function showContent5() {
    element = document.getElementById("checklistDicipli");
    element2 = document.getElementById("checklistDcausa");
    check = document.getElementById("SiD");
    if (check.checked) {
        element.style.display = 'block';
        element2.style.display = 'block';
    }
    else {
        element.style.display = 'none';
        element2.style.display = 'none';
    }
}

function showContent6() {
    element = document.getElementById("OtraIglesia");
    check = document.getElementById("DenominacionP");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}


var maxi = 1;
var contador = new Array(0, 0);
function validar1(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador[grupo] > maxi) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador[grupo]--;
    }
}
var maxi2 = 1;
var contador2 = new Array(0, 0);
function validar(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador2[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador2[grupo] > maxi2) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi2 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador2[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador2[grupo]--;
    }
}
var maxi3 = 1;
var contador3 = new Array(0, 0);
function validar3(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador3[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador3[grupo] > maxi) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi3 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador3[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador3[grupo]--;
    }
}
var maxi4 = 1;
var contador4 = new Array(0, 0);
function validar4(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador4[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador4[grupo] > maxi4) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi4 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador4[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador4[grupo]--;
    }
}

var maxi5 = 1;
var contador5 = new Array(0, 0);
function validar5(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador5[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador5[grupo] > maxi5) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi5 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador5[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador5[grupo]--;
    }
}

var maxi6 = 1;
var contador6 = new Array(0, 0);
function validar6(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador6[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador6[grupo] > maxi6) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi6 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador6[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador6[grupo]--;
    }
}


var maxi7 = 1;
var contador7 = new Array(0, 0);
function validarSexo(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador7[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador7[grupo] > maxi7) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi7 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador7[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador7[grupo]--;
    }
}


var maxi8 = 1;
var contador8 = new Array(0, 0);
function validarDocumento(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador8[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador8[grupo] > maxi8) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi8 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador8[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador8[grupo]--;
    }
}


var maxi9 = 1;
var contador9 = new Array(0, 0);
function validarEstadoCivil(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador9[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador9[grupo] > maxi9) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi9 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador9[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador9[grupo]--;
    }
}

var maxi10 = 1;
var contador10 = new Array(0, 0);
function validarHijo(check, grupo) {
    //Compruebo si la casilla está marcada
    if (check.checked == true) {
        //está marcada, entonces aumento en uno el contador del grupo
        contador10[grupo]++;
        //compruebo si el contador ha llegado al máximo permitido
        if (contador10[grupo] > maxi10) {
            //si ha llegado al máximo, muestro mensaje de error
            swal('No se pueden elegir más de ' + maxi10 + ' casillas a la vez.', "Presione Ok!", "warning");
            //desmarco la casilla, porque no se puede permitir marcar
            check.checked = false;
            //resto una unidad al contador de grupo, porque he desmarcado una casilla
            contador10[grupo]--;
        }
    } else {
        //si la casilla no estaba marcada, resto uno al contador de grupo
        contador10[grupo]--;
    }
}

var btnFoto = document.getElementById("btnFoto");

btnFoto.onchange = function (e) {
    var file = document.getElementById("btnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("imgFoto");
            img.src = reader.result;
            
        }
    }
    reader.readAsDataURL(file);
}