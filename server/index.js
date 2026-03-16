import express from "express"

import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

import { sequelize, dbConnect } from "./config/conn.js"

// Router links
import TodoRouter from './router/todoRouter.js'

//Model links
import ToDoModel from './model/todoModel.js'


const app = express()
const PORT = process.env.PORT || 4001

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

//router
app.use('/todo',TodoRouter)


//connection
const startServer = async () => {
  try {
    await dbConnect()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Server failed to start:", error)
  }
}

startServer()