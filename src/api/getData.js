import fetch from '@/config/fetch'

/**
 * 获取用户列表
 */

export const getUsers = data => fetch('/users', data, 'POST')
export const getUserList = data => fetch('/users', data)
export const signout = () => fetch('/signout', '', 'POST')
export const getUserCount = data => fetch('/users/count', data, 'POST')
export const getAdminInfo = data => fetch('/admin/info', data, 'POST')
