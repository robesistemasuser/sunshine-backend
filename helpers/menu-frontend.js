
const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
       
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            
            { titulo: 'Adicionar producto', url: 'crear-producto' },
            { titulo: 'Listado de productos', url: 'listado-productos' },
            
          ]
        },
        
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
             
            { titulo: 'Productos', url: 'productos' },
            { titulo: 'Variedades', url: 'variedades' },
            { titulo: 'Grados', url: 'grados' },
          ]
        },
      
      ];

    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}
