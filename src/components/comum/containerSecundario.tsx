import React from 'react'

function ContainerSecundario({children} : any) {
  return (
    <div className='max-w-7xl mx-auto  w-full px-4 sm:px-6 lg:px-8'>
        {children || ""}
    </div>
  )
}

export default ContainerSecundario