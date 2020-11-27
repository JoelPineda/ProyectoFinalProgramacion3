listar();
var buscar = document.getElementById("txtBuscarInicio");
buscar.onkeyup = function () {
    var nombrePeriodo = document.getElementById("txtBuscarInicio").value;
    $.get("Datos/buscarFeligrensePorNombre/?nombre=" + nombrePeriodo, function (data) {
        listarDatos(["ID", "Nombre", "Apellido", "Sexo", "Fecha Nacimiento", "Pais", "Telefono"], data);

    });
}

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
    document.getElementById("iglesia").innerHTML = contenido;
    $("#tablas").dataTable({
        searching: true

    });
}

