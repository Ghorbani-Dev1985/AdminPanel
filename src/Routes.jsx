import Home from './Pages/Home/Home'
import Users from './Pages/Users/Users';
import NewUser from './Pages/NewUser/NewUser';
import Products from './Pages/Products/Products';


let routes = [
    {path: '/' , element: <Home />},
    {path: '/users' , element: <Users />},
    {path: '/newUser' , element: <NewUser />},
    {path: '/products' , element: <Products />},
]

export default routes;