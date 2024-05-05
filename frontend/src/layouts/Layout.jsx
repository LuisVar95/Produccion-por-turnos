import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

  const location = useLocation();

  return (
    <>
    <aside className="sidebar">
      <div className='sidebar__contenedor'>
        <nav className='sidebar__nav'>
        <Link to='/graficas'>
            <div className='sidebar__campo'>
                <img className='sidebar__logo-principal' src="../../img/crm2.png" alt="" width={85}/>
            </div>
        </Link>
        <Link to='/' className={location.pathname === '/' ? 'sidebar__link sidebar__link-activo' : 'sidebar__link'}>
            <div className='sidebar__campo'>
            <img className='sidebar__logo' src="../../img/home.png" alt="" width={35}/>
            <p className='sidebar__texto'>Administrador</p>
            </div>
        </Link>
        <Link to='/graficas' className={location.pathname === '/graficas' ? 'sidebar__link sidebar__link-activo' : 'sidebar__link'}>
            <div className='sidebar__campo'>
            <img className='sidebar__logo' src="../../img/grafica.png" alt="" width={35}/>
            <p className='sidebar__texto'>Gráficas de Producción</p>
            </div>
        </Link>
        </nav>
      </div>
    </aside>
    <div className='info'>
        <div className='info__flex'>
            <h1 className='info__titulo'>Administra tu empresa</h1>
            <input type="submit" value='Cerrar Sesion' className='info__boton'/>
        </div>
    </div>
    <main className="main">
        <div className="main__scrollable">
            <Outlet/>
        </div>
    </main>
    </>
  )
}

export default Layout