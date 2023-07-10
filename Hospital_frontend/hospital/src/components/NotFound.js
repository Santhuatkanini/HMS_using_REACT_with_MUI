import React from 'react'
import notFoundImage from '../utils/404Pagemain.png';


const NotFound = () => {
  return (
    <div style={{height:'120vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <img src={notFoundImage} style={{width:'80%', height:'80%'}} alt="404_image" />    
    </div>
  )
}

export default NotFound