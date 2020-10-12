(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        formulario.addEventListener('submit',validarCliente)
    });


    

    

    function validarCliente(e){
        e.preventDefault();
        console.log('validando');
        

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector(' #email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === ''|| telefono === ''|| empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios','error');

            return;
        }

        //crear un objeto con la informacion
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
            
        }
        cliente.id = Date.now();
       
        crearNuevoCliente(cliente);
        

    }
    function crearNuevoCliente(cliente){
        
        const transaction = DB.transaction(['crm'],'readwrite');
        
        transaction.onerror = function(){
            console.log('error en transaccion');
        }
        const objectStore = transaction.objectStore('crm');
        console.log(objectStore);
        objectStore.add(cliente);
        transaction.onerror = function (){
            imprimirAlerta('hubo un error','error');
        }
        transaction.oncomplete = function(){
            console.log('cliente agregado');
            imprimirAlerta('El cliente se agrego correctamente');
            setTimeout(()=>{
                window.location.href='index.html'
            },3000);
        }



    }

    


})();