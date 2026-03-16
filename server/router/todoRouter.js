import express from 'express'
import {fetchData, fetchDataById, createData, updateData, destroyData, markDone} from '../controller/todoController.js'
const router = express.Router()

router.get('/', fetchData)
router.get('/:id', fetchDataById)
router.post('/', createData)
router.put('/:id', updateData)
router.delete('/:id', destroyData)

router.put('/mark-done/:id', markDone)
export default router