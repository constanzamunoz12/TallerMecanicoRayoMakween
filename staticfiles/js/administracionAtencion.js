function confirmDelete(id){
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¡No podrás deshacer esta acción!',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#0088F5",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
          if(result.value){
            Swal.fire(
                'Eliminado',
                'Atención Eliminada correctamente.',
                'succes',
              ).then(function(){
                  window.location.href = "/eliminar/"+ id +"/";
              })
          }
      })
}

function confirmAcept(id){
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¡No podrás deshacer esta acción!',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#0088F5",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
          if(result.value){
            Swal.fire(
                'Aceptada',
                'Atención aceptada.',
                'succes',
              ).then(function(){
                  window.location.href = "/aceptar/"+ id +"/";
              })
          }
      })
}
