var url_client="https://gce7bb1af5c7ff5-db202109231952.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client";
var url_message="https://gce7bb1af5c7ff5-db202109231952.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message";
var url_games="https://gce7bb1af5c7ff5-db202109231952.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games";

function registerClient(){
    var id=Number(document.getElementById("id").value);
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var age=Number(document.getElementById("age").value);
    //alert(id+name+email+age);

    const data = {id:id,name:name,email:email,age:age}
    //alert(data)
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"POST",
        url:url_client,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        success:function(respuesta){
            alert("El cliente fue creado exitosamente.")
        },
        error:function(error){

        }
    });
    //window.location.href="../listar_clientes.html";
    //window.location.href = "listar_clientes.html";
    //llenar_tabla_clientes();
}

function registerGame(){
    var id=Number(document.getElementById("id").value);
    var developer=document.getElementById("developer").value;
    var minage=Number(document.getElementById("minage").value);
    var category_id=Number(document.getElementById("category_id").value);
    var name=document.getElementById("name").value;
    //alert(id+developer+minage+category_id+name);

    const data={id:id,developer:developer,minage:minage,category_id:category_id,name:name}
    let datasend=JSON.stringify(data)

    $.ajax({
        method:"POST",
        url:url_games,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        success:function(respuesta){
                alert("El juego fue creado exitosamente.")
        },
        error:function(error){

        }
    });
}

function registerMessage(){
    var id=document.getElementById("id").value;
    var messagetext=document.getElementById("mensaje").value;

    const data = {id:id,messagetext:messagetext}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"POST",
        url:url_message,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        success:function(respuesta){
            alert("El mensaje fue creado exitosamente.")
        },
        error:function(error){

        }
    });
}

//function enviar_mensaje(){
//    var id=document.getElementById("idT").value;
//    var messagetext=document.getElementById("mensaje").value;

//    const data = {id:id,developer:developer,minage:minage,category_id:category_id,name:name}
//    let datasend = JSON.stringify(data)

//    $.ajax({
//        method:"POST",
//        url:url_message,
//        data:JSON.stringify({"id":id, "messagetext":messagetext}),
//        dataType:'json',
//        contentType:"application/json",
//        complete:function(respuesta){
//            alert("el mensaje fue enviado")
//        },
//     error:function(error){
//          alert("hubo un error al enviar el mensaje")
//       }
//    });
//}

function llenar_tabla_games(){
    document.getElementById("actualiza1").style.display='none';
    var tabla_html="";
    $.ajax({
        method:"GET",
        url:url_games,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html=tabla_html+"<tr><td>"+registro.id+"</td><td>"+registro.developer+"</td><td>"+registro.minage+"</td><td>"+registro.category_id+"</td><td>"+registro.name+"</td><td><button onclick=\"precargue_juego("+registro.id+")\">Actualiza</button></td></tr>";
            });
            $('#tabla1').html(tabla_html);
        }
    });
}

function llenar_tabla_clientes(){
    document.getElementById("actualiza4").style.display='none';
    var tabla_html1="";
    
    $.ajax({
        method:"GET",
        url:url_client,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html1=tabla_html1+"<tr><td>"+registro.id+"</td><td>"+registro.name+"</td><td>"+registro.email+"</td><td>"+registro.age+"</td><td><button onclick=\"preloadClient("+registro.id+")\">Actualiza</button></td></tr>";
            });
            $('#tabla1').html(tabla_html1);
        }
    });
}

function llenar_tabla_mensajes(){
    document.getElementById("actualiza7").style.display='none';
    var tabla_html2="";

    $.ajax({
        method:"GET",
        url:url_message,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html2=tabla_html2+"<tr><td>"+registro.id+"</td><td>"+registro.messagetext+"</td><td><button onclick=\"preloadMessage("+registro.id+")\">Actualiza</button></td></tr>";
            });
            $('#tabla1').html(tabla_html2);
        }
    });
}

function borrar_mensaje(id){
    $.ajax({
        method:"DELETE",
        url:url_message,
        data:JSON.stringify({"id":id}),
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
            alert("el registro fue borrado")
        }
    });
    location.reload();
}

function updateClient(){
    var id=Number(document.getElementById("id").value);
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var age=Number(document.getElementById("age").value);

    const data = {id:id,name:name,email:email,age:age}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"PUT",
        url:url_client,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(respuesta){
        }
    });
    llenar_tabla_clientes();
}

function updateMessage(id){
    var id=document.getElementById("id").value;
    var messagetext=document.getElementById("mensaje").value;

    const data = {id:id,messagetext:messagetext}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"PUT",
        url:url_message,
        data:datasend,
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
        }
    });
    llenar_tabla_mensajes();
}

function updateGame(id){
    var id=document.getElementById("id").value;
    var developer=document.getElementById("developer").value;
    var minage=document.getElementById("minage").value;
    var category_id=document.getElementById("category_id").value;
    var name=document.getElementById("name").value;
    $.ajax({
        method:"PUT",
        url:url_games,
        data:JSON.stringify({"id":id,"developer":developer, "minage":minage, "category_id":category_id, "name":name}),
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
        }
    });
    llenar_tabla_games();
}

function precargue_juego(id){
    document.getElementById("actualiza0").style.display='none';
    document.getElementById("actualiza1").style.display='block';
    var url_games2=url_games+"/"+id
    $.ajax({
        method:"GET",
        url:url_games2,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                document.getElementById("id").value=registro.id;
                document.getElementById("developer").value=registro.developer;
                document.getElementById("minage").value=registro.minage;
                document.getElementById("category_id").value=registro.category_id;
                document.getElementById("name").value=registro.name;
            });
        }
    });
}

function preloadClient(id){
    document.getElementById("actualiza3").style.display='none';
    document.getElementById("actualiza4").style.display='block';
    var url_client2=url_client+"/"+id
    $.ajax({
        method:"GET",
        url:url_client2,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                document.getElementById("id").value=registro.id;
                document.getElementById("name").value=registro.name;
                document.getElementById("email").value=registro.email;
                document.getElementById("age").value=registro.age;
            });
        }
    });
}

function listarClientes(){
    var tabla_html1="";
    $.ajax({
        method:"GET",
        url:url_client,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html1=tabla_html1+"<tr><td>"+registro.id+"</td><td>"+registro.name+"</td><td>"+registro.email+"</td><td>"+registro.age+"</td></tr>";
            });
            $('#tabla1').html(tabla_html1);
        }
    });
}

function listarGames(){
    var tabla_html="";
    $.ajax({
        method:"GET",
        url:url_games,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html=tabla_html+"<tr><td>"+registro.id+"</td><td>"+registro.developer+"</td><td>"+registro.minage+"</td><td>"+registro.category_id+"</td><td>"+registro.name+"</td></tr>";
            });
            $('#tabla2').html(tabla_html);
        }
    });
}

function listarMessage(){
    var tabla_html2="";
    $.ajax({
        method:"GET",
        url:url_message,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html2=tabla_html2+"<tr><td>"+registro.id+"</td><td>"+registro.messagetext+"</td></tr>";
            });
            $('#tabla3').html(tabla_html2);
        }
    });
}

function deleteClient() {
    var id=Number(document.getElementById("id").value);

    const data = {id:id}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"DELETE",
        url:url_client,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            console.log("Elimino Registro!!")
        },
        error: function (error) {
        }
    });
}

function deleteGame() {
    var id=document.getElementById("id").value;
    
    const data = {id:id}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"DELETE",
        url:url_games,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            console.log("Elimino Registro!!")
        },
        error: function (error) {
        }
    });
}

function deleteMessage() {
    var id=document.getElementById("cedula").value;

    const data = {id:id}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"DELETE",
        url:url_message,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            console.log("Elimino Registro!!")
        },
        error: function (error) {
        }
    });
}

btnGet.addEventListener("click", (e) => {
    e.preventDefault()
    peticionGet()
})

btnPost.addEventListener("click", (e) => {
    e.preventDefault()
    peticionPost()
})

btnPut.addEventListener("click", (e) => {
    e.preventDefault()
    peticionPut()
})

btnDelete.addEventListener("click", (e) => {
    e.preventDefault()
    peticionDelete()
})

