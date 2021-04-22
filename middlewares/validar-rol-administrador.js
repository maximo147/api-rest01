
const validarRolAdministrador = async(req, res, next) => {
    try{
        if(!req.usuario){
            return res.status(500).json({
                message: 'Usuario no existe en la BD'
            })
        }
        const user = req.usuario
        const isAdmin = user.rol
        if(isAdmin !== 'ADMIN_ROLE'){
            return res.status(401).json({
                message: 'No tiene los permisos suficientes'
            })
        }
        next()

    }catch(err){
        console.log(err)
        return res.status(401).json({
            message: 'Hable con el administrador - validar rol'
        })
    }
}

module.exports = validarRolAdministrador