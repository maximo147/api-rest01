const { Router } = require('express')
const { check } = require('express-validator')
const { roleValidator,
        emailValidator, 
        idValidator } = require('../database/helpers/db-validator')
const { usuariosGET,
        usuariosPOST,
        usuariosPUT,
        usuariosPATCH,
        usuariosDELETE } = require('../controller/users.controller')
const validarCampos = require('../middlewares/validar-campos')
const router = Router()

router.get('/', usuariosGET)
// router.get('/:id', usuariosGET)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailValidator),
    check('password', 'El correo debe ser mayor de 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(roleValidator),
    validarCampos
], usuariosPOST)

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(idValidator),
    check('rol').custom(roleValidator),
    validarCampos
], usuariosPUT)

router.patch('/', usuariosPATCH)

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(idValidator),
    validarCampos
],usuariosDELETE)


module.exports = router