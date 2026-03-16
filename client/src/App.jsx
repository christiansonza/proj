import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Todo from './views/Todo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  )
}

export default App