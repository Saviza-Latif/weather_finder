import { useState } from 'react'
import Weather_Form from './components/Weather_Form'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Weather_Form/>
        </div>
    </>
  )
}

export default App
