import React from 'react'
import './Maintenance.css'
import Cactus from 'client/assets/not_found_page/cactus.svg'

const MaintenanceScreen = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img alt='Cactus!' src={Cactus} className='rotating-cactus' />
  </div>
)

export default MaintenanceScreen
