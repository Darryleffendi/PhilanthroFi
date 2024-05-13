import { useAuth } from '@lib/hooks/useAuth';
import React from 'react'
import AdminRoute from 'src/middleware/admin-route'

export default function AdminManage() {
  const {adminLogout} = useAuth();
  return (
    <AdminRoute>
      <div onClick={()=>{adminLogout()}}>admin-manate</div>
    </AdminRoute>
  )
}
