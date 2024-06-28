import React from 'react'
import Sidenav from '../components/Sidenav'
import Posts from '../components/Posts';

const Home = () => {
  return (
    <div className="flex">
        <Sidenav/>
      <div className='w-full overflow-y-scroll h-[100vh]'>

        <Posts/>
        {/*alignment div*/}
        <div className="h-[20px] w-full"></div>
      </div>
    </div>
  )
}

export default Home