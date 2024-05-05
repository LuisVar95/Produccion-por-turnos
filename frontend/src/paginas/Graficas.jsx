import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import clienteAxios from '../../config/clienteAxios';


const Graficas = () => {

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const [anio, setAnio] = useState(yesterday.getFullYear().toString());
const [mes, setMes] = useState((yesterday.getMonth() + 1).toString()); // Se suma 1 porque los meses van de 0 a 11
const [dia, setDia] = useState(yesterday.getDate().toString());
const [horas, setHoras] = useState('7am-3pm');
const [registros, setRegistros] = useState([]);


const handleAnioChange = (e) => {
  setAnio(e.target.value);
}

const handleMesChange = (e) => {
  setMes(e.target.value);
}

const handleDiaChange = (e) => {
  setDia(e.target.value);
}

const handleHoraChange = (e) => {
  setHoras(e.target.value);
}

useEffect(() => {
  const obtenerRegistros = async () => {
    const { data } = await clienteAxios(`/produccion/produccion/${anio}/${mes}/${dia}/${horas}`)
    console.log(data)
    setRegistros(data.registrosFormateados);
  }

  obtenerRegistros();
}, [anio, mes, dia, horas])

//console.log(registros)

const registrosProductoA = registros.filter(registro => registro.producto === 'A');
const registrosProductoB = registros.filter(registro => registro.producto === 'B');

console.log(registrosProductoA)
console.log(registrosProductoB)

const registrosOrdenadosA = [...registrosProductoA].sort((a, b) => a.lineaProduccion - b.lineaProduccion);
const registrosOrdenadosB = [...registrosProductoB].sort((a, b) => a.lineaProduccion - b.lineaProduccion);


  return (
    <>
    <h1 className='heading'>Area de Producción</h1>
    <div className='buscadores'>
        <div className='buscadores__flex'>
            <div className='buscador'>
            <label htmlFor="" className='buscador__label'>Filtrar año: </label>
            <select name="" id="" className='buscador__select' value={anio} onChange={handleAnioChange}>
              <option value="" className='buscador__option'>--Seleccionar--</option>
              <option value="2024" className='buscador__option'>2024</option>
              <option value="2023" className='buscador__option'>2023</option>
            </select>
            </div>

            <div className='buscador'>
            <label htmlFor="" className='buscador__label'>Filtrar mes: </label>
              <select name="" id="" className='buscador__select' value={mes} onChange={handleMesChange}>
                <option value="" className='buscador__option'>--Seleccionar--</option>
                <option value="1" className='buscador__option'>1</option>
                <option value="2" className='buscador__option'>2</option>
                <option value="3" className='buscador__option'>3</option>
                <option value="4" className='buscador__option'>4</option>
                <option value="5" className='buscador__option'>5</option>
                <option value="6" className='buscador__option'>6</option>
                <option value="7" className='buscador__option'>7</option>
                <option value="8" className='buscador__option'>8</option>
                <option value="9" className='buscador__option'>9</option>
                <option value="10" className='buscador__option'>10</option>
                <option value="11" className='buscador__option'>11</option>
                <option value="12" className='buscador__option'>12</option>
              </select>
            </div>

            <div className='buscador'>
            <label htmlFor="" className='buscador__label'>Filtrar dia: </label>
              <select name="" id="" className='buscador__select' value={dia} onChange={handleDiaChange}>
              {[...Array(31).keys()].map((day) => (
                <option className='buscador__option' key={day + 1} value={day + 1}>{day + 1}</option>
              ))}
              </select>
            </div>

            <div>
            <label htmlFor="" className='buscador__label'>Filtrar hora: </label>
              <select className='buscador__select' value={horas} onChange={handleHoraChange}>
                <option className='buscador__option' value="">-- Seleccionar--</option>
                <option className='buscador__option' value="7am-3pm">7am - 3pm</option>
                <option className='buscador__option' value="3pm-11pm">3pm - 11pm</option>
              </select>
            </div>
        </div>
    </div>
    <div className='graficas'>
        <div className='graficas__contenido'>
          <h2 className='graficas__nombreProducto'>Producto A</h2>
        {registrosOrdenadosA.length > 0 ? (
          <h2 className='graficas__titulo'>Producción del turno - {registrosProductoA[0].turno}</h2>
        ) : (
          <h2 className='graficas__titulo'>No hay registros para el producto A</h2>
        )}
          <LineChart
            width={700}
            height={400}
            data={registrosOrdenadosA}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lineaProduccion" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cantidadProducida" stroke="#E67E22" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        
        <div className='graficas__contenido'>
        <h2 className='graficas__nombreProducto'>Producto B</h2>
        {registrosOrdenadosB.length > 0 ? (
          <h2 className='graficas__titulo'>Producción del turno - {registrosProductoB[0].turno}</h2>
        ) : (
          <h2 className='graficas__titulo'>No hay registros para el producto B</h2>
        )}
          <LineChart
            width={700}
            height={400}
            data={registrosOrdenadosB}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lineaProduccion" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cantidadProducida" stroke="#E67E22" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
    </div>
    </>
  )
}

export default Graficas