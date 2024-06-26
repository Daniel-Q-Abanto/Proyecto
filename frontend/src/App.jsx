import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Usuario from './components/usuarios/Usuario';
import Categoria from './components/categorias/Categoria';
import Marca from './components/marcas/Marca';
import Producto from './components/productos/Producto';
import Pedido from './components/pedidos/Pedido';
import AgregarUsuario from './components/usuarios/AgregarUsuario';
import AgregarCategoria from './components/categorias/AgregarCategoria';
import AgregarMarca from './components/marcas/AgregarMarca';
import AgregarProducto from './components/productos/AgregarProducto';
import AgregarPedido from './components/pedidos/AgregarPedido';
import Login from './components/admin/Login';
import RegisterSuperUser from './components/admin/RegisterSuperUser';
import PrivateRoute from './components/admin/PrivateRoute';
import PublicRoute from './components/admin/PublicRoute';
import NavBar from './components/NavBar';
import EditarUsuario from './components/usuarios/EditarUsuario';
import EditarCategoria from './components/categorias/EditarCategoria';
import EditarMarca from './components/marcas/EditarMarca';
import EditarProducto from './components/productos/EditarProducto';
import EditarPedido from './components/pedidos/EditarPedido';
import DetallePedido from './components/detalle_pedido/DetallePedido';
import AgregarDetallePedido from './components/detalle_pedido/AgregarDetallePedido';
import EditarDetallePedido from './components/detalle_pedido/EditarDetallePedido';
import EliminarUsuario from './components/usuarios/EliminarUsuario';
import EliminarDetallePedido from './components/detalle_pedido/EliminarDetallePedido';
import EliminarPedido from './components/pedidos/EliminarPedido';
import EliminarProducto from './components/productos/EliminarProducto';
import EliminarMarca from './components/marcas/EliminarMarca';
import EliminarCategoria from './components/categorias/EliminarCategoria';

function App() {
  const drawerWidth = 240;

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterSuperUser /></PublicRoute>} />
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <NavBar drawerWidth={drawerWidth}>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="usuario" element={<Usuario />} />
                  <Route path="categoria" element={<Categoria />} />
                  <Route path="marca" element={<Marca />} />
                  <Route path="producto" element={<Producto />} />
                  <Route path="pedido" element={<Pedido />} />
                  <Route path="detalle-pedido" element={<DetallePedido />} />
                  

                  <Route path="agregar-usuario" element={<AgregarUsuario />} />
                  <Route path="agregar-categoria" element={<AgregarCategoria />} />
                  <Route path="agregar-marca" element={<AgregarMarca />} />
                  <Route path="agregar-producto" element={<AgregarProducto />} />
                  <Route path="agregar-pedido" element={<AgregarPedido />} />
                  <Route path="agregar-detalle-pedido" element={<AgregarDetallePedido />} />


                  <Route path="editar-usuario/:id" element={<EditarUsuario />} />
                  <Route path="editar-categoria/:id" element={<EditarCategoria />} />
                  <Route path="editar-marca/:id" element={<EditarMarca />} />
                  <Route path="editar-producto/:id" element={<EditarProducto />} />
                  <Route path="editar-pedido/:id" element={<EditarPedido />} />
                  <Route path="editar-detalle-pedido/:id" element={<EditarDetallePedido />} />


                  <Route path="eliminar-usuario/:id" element={<EliminarUsuario />} />
                  <Route path="eliminar-categoria/:id" element={<EliminarCategoria />} />
                  <Route path="eliminar-marca/:id" element={<EliminarMarca />} />
                  <Route path="eliminar-producto/:id" element={<EliminarProducto />} />
                  <Route path="eliminar-pedido/:id" element={<EliminarPedido />} />
                  <Route path="eliminar-detalle-pedido/:id" element={<EliminarDetallePedido />} />


                </Routes>
              </NavBar>
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
