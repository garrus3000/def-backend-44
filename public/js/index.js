const socket = io();


const listaDeProductos = async (productos) => {
    const fetchProd = fetch('../views/productos.hbs')
        .then((res) => res.text())
        .then((view) => {
            const template = Handlebars.compile(view);
            const html = template({ productos });
            return html;
        })
        .then((html) => html);
    return fetchProd;
};

socket.on("productos", (productos) => {
    listaDeProductos(productos).then((html) => {
        document.getElementById("productos").innerHTML = html;
    });
});

const ingresoProducto = document.getElementById("ingresarProducto");

ingresoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const producto = {
        timestamp: new Date().toISOString(),
        nombre: e.target.nombre.value,
        descripcion : e.target.descripcion.value,
        precio : e.target.precio.value,
        foto : e.target.foto.value,
        codigo: Date.now(),
        stock : 200   
    };

    socket.emit("agregarProducto", producto);
    e.target.nombre.value = "";
    e.target.precio.value = "";
    e.target.foto.value = "";
});



// Productos con Fake.js vista en HBS
// fetch("/api/productos-test")
//     .then((response) => response.json())
//     .then((data) => listaDeProductos(data))
//     .catch((err) => console.log(err));

// const listaDeProductos = (data) => {
//     const productos = data;
//     fetch("../views/productos.hbs")
//         .then((res) => res.text())
//         .then((template) => Handlebars.compile(template))
//         .then((compiled) => compiled({ productos }))
//         .then( (html) => (document.getElementById("productos").innerHTML = html) );
// };


// Mensajes, guardados en el archivo DB/mensajes.json
const chat = document.getElementById("enviarMensaje");

chat.addEventListener("submit", async (e) => {
    e.preventDefault();
    const mensaje = {
        author: {
            email: e.target.email.value,
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            edad: e.target.edad.value,
            alias: e.target.alias.value,
            avatar: e.target.avatar.value,
            fecha: new Date().toLocaleString(),
        },
        text: e.target.text.value,
    };
    await socket.emit("new-message", mensaje );
    e.target.text.value = "";
});

const formatoMesaje = (msj) => {
    const propMensaje = {
        nombre: msj.author.nombre,
        email: msj.author.email,
        alias: msj.author.alias,
        avatar: msj.author.avatar,
        fecha: msj.author.fecha,
        text: msj.text,   
    };
    const html = ` <article> 
                        <span class="text-primary fs-5 fw-bold">${propMensaje.email}</span>
                        <span class="text-muted fs-6 fw-bold">${propMensaje.alias}</span>
                        [<span class="text-brown fw-semibold">${propMensaje.fecha}</span>] :
                        <span class="text-success fst-italic">${propMensaje.text}</span>
                        <img src="${propMensaje.avatar}" alt="${propMensaje.alias}" class="rounded-circle ms-3" width="75" height="75">
                    </article>`;
    return html;
};

const renderMensajes = (msj) => {
    const listaMensajes = msj
    .map((mensaje) => formatoMesaje(mensaje))
    .join("");
    if (listaMensajes === "") {
        document.getElementById("messages").innerHTML =  `<div> <p class=" p-2 text-danger fs-3 text-center">No hay mensajes</p> </p>`;
    } else {
        document.getElementById("messages").innerHTML = listaMensajes;
    }
};


socket.on("messages", (msj) => {
    renderMensajes(msj);
});

const btnLogout = () => {
    const logoutBtn = document.getElementById('btnLogout');
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logoutBtn.classList.add('disabled');
        e.target.removeEventListener("click", btnLogout);
        logoutBtn.innerHTML = `Cerrando sesión <span class="spinner-border spinner-border-sm"></span>`;
        window.location.href = "/logout";
    });

};
btnLogout();
