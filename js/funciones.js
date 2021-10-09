var url_client="https://gce7bb1af5c7ff5-db202109231952.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client";
var url_message="https://gce7bb1af5c7ff5-db202109231952.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message";
var url_games="https://gce7bb1af5c7ff5-db202109231952.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games";
const btnPost=document.getElementById("create")
const btnGet=document.getElementById("replace")
const btnPut=document.getElementById("update")
const btnDelete=document.getElementById("delete")

btnPost.addEventListener("click", (e) => {
    e.preventDefault()
    registerClient()
})

function registerClient() {
    var id=Number(document.getElementById("id").value);
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var age=Number(document.getElementById("age").value);

    const data = {"id":id,"name":name,"email":email,"age":age}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"POST",
        url:url_client,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        success:function(response){
            console.log(response.status)
        },
        error:function(error){
            console.log(error.status)
        }
    });
}

btnPost.addEventListener("click", (e) => {
    e.preventDefault()
    registerMessage()
})

function registerMessage(){
    var id=Number(document.getElementById("id").value);
    var messagetext=document.getElementById("mensaje").value;

    const data = {"id":id,"messagetext":messagetext}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"POST",
        url:url_message,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        success:function(response){
            console.log(response.status)
        },
        error:function(error){
            console.log(error.status)
        }
    });
}

btnPost.addEventListener("click", (e) => {
    e.preventDefault()
    registerGame()
})

function registerGame(){
    var id=Number(document.getElementById("id").value);
    var developer=document.getElementById("developer").value;
    var minage=Number(document.getElementById("minage").value);
    var category_id=Number(document.getElementById("category_id").value);
    var name=document.getElementById("name").value;
    
    const data={"id":id,"developer":developer,"minage":minage,"category_id":category_id,"name":name}
    let datasend=JSON.stringify(data)

    $.ajax({
        method:"POST",
        url:url_games,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        success:function(response){
            console.log(response.status)
        },
        error:function(error){
            console.log(error.status)
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
                tabla_html1=tabla_html1+"<tr><td>"+registro.id+"</td><td>"+registro.name+"</td><td>"+registro.email+"</td><td>"+registro.age+"</td><td><button onclick=\"preloadClient("+registro.id+")\">Actualiza</button></td><td><button onclick=\"deleteClient("+registro.id+")\">Borrar</button></td></tr>";
            });
            $('#tabla1').html(tabla_html1);
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

btnPut.addEventListener("click", (e) => {
    e.preventDefault()
    updateClient()
})

function updateClient(){
    var id=Number(document.getElementById("id").value);
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var age=Number(document.getElementById("age").value);

    const data = {"id":id,"name":name,"email":email,"age":age}
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

function llenar_tabla_message(){
    document.getElementById("actualiza7").style.display='none';
    var tabla_html2="";

    $.ajax({
        method:"GET",
        url:url_message,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html2=tabla_html2+"<tr><td>"+registro.id+"</td><td>"+registro.messagetext+"</td><td><button onclick=\"preloadMessage("+registro.id+")\">Actualiza</button></td><td><button onclick=\"deleteClient("+registro.id+")\">Borrar</button></td></tr>";
            });
            $('#tabla2').html(tabla_html2);
        }
    });
}

function preloadMessage(id){
    document.getElementById("actualiza6").style.display='none';
    document.getElementById("actualiza7").style.display='block';
    var url_message2=url_message+"/"+id
    $.ajax({
        method:"GET",
        url:url_message2,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                document.getElementById("id").value=registro.id;
                document.getElementById("mensaje").value=registro.messagetext;
            });
        }
    });
}

btnPut.addEventListener("click", (e) => {
    e.preventDefault()
    updateMessage()
})

function updateMessage(){
    var id=Number(document.getElementById("id").value);
    var messagetext=document.getElementById("mensaje").value;

    const data = {"id":id,"messagetext":messagetext}
    let datasend = JSON.stringify(data)

    $.ajax({
        method:"PUT",
        url:url_message,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(respuesta){
        }
    });
    llenar_tabla_mensajes();
}

function llenar_tabla_games(){
    document.getElementById("actualiza1").style.display='none';
    var tabla_html="";
    $.ajax({
        method:"GET",
        url:url_games,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html=tabla_html+"<tr><td>"+registro.id+"</td><td>"+registro.developer+"</td><td>"+registro.minage+"</td><td>"+registro.category_id+"</td><td>"+registro.name+"</td><td><button onclick=\"precargue_juego("+registro.id+")\">Actualiza</button></td><td><button onclick=\"deleteClient("+registro.id+")\">Borrar</button></td></tr>";
            });
            $('#tabla1').html(tabla_html);
        }
    });
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

btnPut.addEventListener("click", (e) => {
    e.preventDefault()
    updateGame()
})

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

btnDelete.addEventListener("click", (e) => {
    e.preventDefault()
    deleteClient()
})

function deleteClient(id) {
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
    llenar_tabla_clientes()
}

btnDelete.addEventListener("click", (e) => {
    e.preventDefault()
    deleteMessage()
})

function deleteMessage(id) {
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
    llenar_tabla_message()
}

btnGame.addEventListener("click", (e) => {
    e.preventDefault()
    deleteGame()
})

function deleteGame(id) {
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
    llenar_tabla_games();
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


