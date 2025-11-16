//queremos que se muestre: Nombre, edad, username, teléfono, email, compañía, dirección
//capturamos el id del ul donde van a ir los usuarios simulados

const listaUsuarios = document.getElementById("listaUsuarios")


//FORMA 1: SIN DESTRUCTURING Y SIN SPREAD OPERATOR
//Pedimos la información a la API dentro de una función

function usuariosFicticios() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        if(!response.ok) {
            throw new Error ("Se ha producido un error")
        }
        return response.json()
    })
    .then((data) => { //con la data que nos ha dado la API colocamos y sacamos nuestros datos
        listaUsuarios.innerHTML = data.map(elemento => {
            let imagen = `/assets/img/${elemento.id}.jpeg`;
            let nombre = elemento.name;
            let edad = Math.floor(Math.random() * (63-18+1)) + 18; // rango de 18 a 63 --> let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
            let username = elemento.username;
            let telefono = elemento.phone;
            let email = elemento.email;
            let company = elemento.company.name;
            let direccion = `${elemento.address.street}, ${elemento.address.suite}, ${elemento.address.city}`
            return `<li class="contenedorIndividual">
            <img src="${imagen}" alt="${nombre}">
            <div id="subcontainer">
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Edad:</strong> ${edad}</p>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Email:</strong> ${email}</p>
            </div>
            <div id="subsubcontainer">
                <p><strong>Compañía:</strong> ${company}</p>
                <p><strong>Dirección:</strong> ${direccion}</p>
            </div>
            </li>
            `
        }).join("")
    })
.catch(error => console.log(error))
}

usuariosFicticios()


/*FORMA 2: con destructuring y con spread operator. Lo he hecho con la 1a porque es la que me ha salido por mí misma. Para esta me ha ayudado mucho chatgpt porque no llegaba a la solución.

// Capturamos el UL donde vamos a poner los usuarios

function usuariosFicticios() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) throw new Error("Se ha producido un error");
            return response.json();
        })
        .then(data => {
            // Creamos un nuevo array con propiedades extras usando spread y destructuring
            const nuevosUsuarios = data.map(elemento => {
                const { address, company } = elemento; // destructuring
                return {
                    ...elemento, // copiamos todas las propiedades originales
                    age: Math.floor(Math.random() * (63 - 18 + 1)) + 18, // edad aleatoria 18-63
                    img: `/assets/img/${elemento.id}.jpeg`, // ruta de imagen
                    address: {
                        ...address,
                        full: `${address.street}, ${address.suite}, ${address.city}` // dirección completa
                    },
                    company // dejamos company tal cual para usar company.name
                };
            });

            // Generamos todo el HTML de golpe usando map y join
            listaUsuarios.innerHTML = nuevosUsuarios.map(usuario => {
                const { name, age, username, phone, email, company, address, img } = usuario;
                return `
                    <li class="contenedorIndividual">
                        <img src="${img}" alt="${name}">
                        <p>Nombre: ${name}</p>
                        <p>Edad: ${age}</p>
                        <p>Username: ${username}</p>
                        <p>Teléfono: ${phone}</p>
                        <p>Email: ${email}</p>
                        <p>Compañía: ${company.name}</p>
                        <p>Dirección: ${address.full}</p>
                    </li>
                `;
            }).join(""); // join("") convierte el array de strings en un solo string
        })
        .catch(error => console.log(error));
}

// Ejecutamos la función
usuariosFicticios();*/
