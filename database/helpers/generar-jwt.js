
const jwt = require('jsonwebtoken')

const generarJWT = async ( uid = '' ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRETPUBLICKEY,
            { expiresIn: '1h' }, 
            (err, token) => {
                if(err) {
                    reject('No se pudo generar JWT')
                }else{
                    resolve( token )
                }
            })
    })
}

module.exports = {
    generarJWT
}