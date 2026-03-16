import {configureStore} from '@reduxjs/toolkit'
import {TodoApi} from '../features/TodoSlice'

const store = configureStore({
    reducer:{
        [TodoApi.reducerPath] : TodoApi.reducer
    },
    middleware:(gdm)=>
        gdm().concat([
            TodoApi.middleware
        ])
})


export default store