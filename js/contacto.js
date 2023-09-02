//ARMANDO EL APARTADO DE CONTACTO
let section = document.getElementById("contactform");


contactform.innerHTML = `        <form action="">
<p>
    <label id="nombre">Nombre</label>
    <input type="text" name="nombre">
</p>
<p>
    <label>Apellido/s</label>
    <input type="text" name="apellido">
</p>
<p>
    <label>Número de teléfono</label>
    <input type="tel" name="celular">
</p>
<p>
    <label>Contraseña</label>
    <input type="password" name="affair">
</p>
<p class="block">
    <label>Mensaje</label> 
    <textarea name="message" rows="3"></textarea>
</p>
<p class="block">
    <button id="botonera">
        Enviar
    </button>
</p>
</form>`

//AHORA REINICIAMOS EL FORMULARIO LUEGO DE ENVIARLO
const formulario = document.querySelector("#contactform");

const boton = document.getElementById(`botonera`);
		boton.addEventListener("click", (event) => {
            event.preventDefault()

            const nombreInput = document.querySelector(`input[name="nombre"]`);
            const apellidoInput = document.querySelector(`input[name="apellido"]`);
            const celularInput = document.querySelector(`input[name="celular"]`);
            const affairInput = document.querySelector(`input[name="affair"]`);
            const messageInput = document.querySelector(`textarea[name="message"]`);
        
        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;

//COLOCAMOS UNA ALERTA
			Swal.fire({
                icon: `success`,
                title: `Registro exitoso!`,
                text: `Hola ${nombre} ${apellido}, su mensaje será respondido en breve.`,
            }).then((result) => {
                if (result.isConfirmed){   
                nombreInput.value = "";
                apellidoInput.value = "";
                celularInput.value = "";
                affairInput.value = "";
                messageInput.value = "";
    
            }    
    });
    });
