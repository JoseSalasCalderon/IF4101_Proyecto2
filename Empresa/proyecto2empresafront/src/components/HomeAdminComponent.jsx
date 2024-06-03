import React from 'react'

export const HomeAdminComponent = ({ usuarioSesion }) => {
  return (
    <div>Bienvenido {usuarioSesion.nombreUsuario}!</div>
  )
}
