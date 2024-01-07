
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'

function App() {
  let router = useRoutes(routes)

  return (
    <>
     <Toaster />
      {router}
    </>
  )
}

export default App
