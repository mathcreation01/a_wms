import React, { useEffect } from 'react'
import {Breadcrumb} from '~/components';

const AllUsers = () => {
  
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} | Users - Admin Panel`;
  }, []);
  




  return (
    <main className="dashboard wrapper">
       
          <Breadcrumb title="Users" description="Manage all users in the system" />
        </main>
  )
}

export default AllUsers

      
 