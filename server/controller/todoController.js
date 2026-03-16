import Todo from '../model/todoModel.js'

export const fetchData = async(req,res)=>{
    try {
        const result = await Todo.findAll()
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}

export const fetchDataById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await Todo.findByPk(id)
        if(!result){
            return res.status(404).json({message:'Data not found.'})
        }
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}

export const createData = async(req,res)=>{
    try {
        const {name, status} = req.body

        if(!name){
            return res.status(400).json({message:'Name is required.'})
        }
        const result = await Todo.create({
            name,
            status
        })

        res.status(201).json({
            message:'Created Successfully',
            data:result
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}

export const updateData = async(req,res)=>{
    try {
        const {id} = req.params
        const {name, status} = req.body

        const result = await Todo.findByPk(id)
        if(!result){
            return res.status(404).json({message:'Data not found.'})
        }

        await result.update({
            name: name ?? result.name,
            status: status ?? result.status
        })

        res.status(200).json({
            message:'Updated Successfully',
            data:result
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}

export const destroyData = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await Todo.findByPk(id)

        if(!result){
            return res.status(404).json({message:'Data not found.'})
        }

        await result.destroy()
        
        res.status(200).json({message:'Deleted Successfully.'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}

export const markDone = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Todo.findByPk(id)

        if (!task) {
        return res.status(404).json({ message: "Task not found." })
        }

        task.status = !task.status
        await task.save()

        res.status(200).json({
        message: `Task marked as ${task.status ? 'done' : 'not done'}`,
        data: task
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}