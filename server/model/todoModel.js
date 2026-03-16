import { sequelize } from "../config/conn.js";
import { DataTypes } from "sequelize";


const todo = sequelize.define('TodoList',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {tableName:'ToDoList'}
)


export default todo