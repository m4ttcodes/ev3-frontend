var g_id_usuario ="";

//Función para agregar usuario
function agregarUsuario(){
//Obtenemos los datos del usuario
var id_usuario = document.getElementById("txt_id").value;
var dv = document.getElementById("txt_DV").value;
var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;
var username = document.getElementById("txt_username").value;
var password = document.getElementById("txt_password").value;

var fechaHoraActual = obtenerFechaHora();

//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "id_usuario": id_usuario,
  "dv": dv,
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "username": username,
  "password": password,
  "fecha_registro": fechaHoraActual
});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud

fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
  .then((response) => {
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastCrear = document.getElementById("liveToast");

    if (toastTrigger, response.status == 200) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastCrear)
      toastTrigger.addEventListener("click", () => {
        toastBootstrap.show()
      })
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
`<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${fechaHoraFormateada}</td>
  <td>
    <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning'>Actualizar</a> 
    <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger'>Eliminar</a> 
  </td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario= parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);

}
function obtenerDatosEliminar(id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element){
  var username = element.username;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el usuario? <b>" + username + "</b>";

}

function completarFormulario(element){

  var id_usuario = element.id_usuario;
  var dv = element.dv;
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  var email = element.email;
  var celular = element.celular;
  var username = element.username;
  var password = element.password;

  document.getElementById("txt_id").value = id_usuario;
  document.getElementById("txt_DV").value = dv;
  document.getElementById("txt_nombres").value = nombres;
  document.getElementById("txt_apellidos").value = apellidos;
  document.getElementById("txt_email").value = email;
  document.getElementById("txt_celular").value = celular;
  document.getElementById("txt_username").value = username;
  document.getElementById("txt_password").value = password;
}

function actualizarUsuario(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  var id_usuario = document.getElementById("txt_id").value;
  var dv = document.getElementById("txt_DV").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;
  var password = document.getElementById("txt_password").value;
  
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username": username,
    "password": password
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      const toastTrigger = document.getElementById("liveToastBtn");
      const toastActualizar = document.getElementById("liveToast");

    if (toastTrigger, response.status == 200) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastActualizar)
      toastTrigger.addEventListener("click", () => {
        toastBootstrap.show()
      })
    }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  function eliminarUsuario(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_tipo_gestion, requestOptions)
      .then((response) => {
        const toastTrigger = document.getElementById("liveToastBtn");
        const toastEliminar = document.getElementById("liveToast");

      if (toastTrigger, response.status == 200) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEliminar)
        toastTrigger.addEventListener("click", () => {
          toastBootstrap.show()
        })
      }
      if(toastTrigger, response.status == 400){
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEliminar)
        toastTrigger.addEventListener("click", () => {
          toastBootstrap.show()
        })
      }
    })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }

function obtenerFechaHora(){
  var fechaHoraActual = new Date();
  var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12 :false,
    year :'numeric',
    month :'2-digit',
    day:'2-digit',
    hour : '2-digit',
    minute :'2-digit',
    second : '2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fechaHoraFormateada;
}
function formatearFechaHora(fecha_registro){
  var fechaHoraActual = new Date(fecha_registro);
  var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12 :false,
    year :'numeric',
    month :'2-digit',
    day:'2-digit',
    hour : '2-digit',
    minute :'2-digit',
    second : '2-digit',
    timeZone:'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fechaHoraFormateada;
}