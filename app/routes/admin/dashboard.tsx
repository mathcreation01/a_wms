import React, { useEffect } from 'react'
import { Breadcrumb } from '~/components'

const dashboard = () => {
   
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} | Dashboard - Admin Panel`;
  }, []);
  return (
    <main className="dashboard wrapper">
      <Breadcrumb title="Dashboard" description="Overview of the system's performance and statistics" />
    </main>
  )
}

export default dashboard
