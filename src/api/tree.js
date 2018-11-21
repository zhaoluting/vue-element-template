import request from '@/utils/request'

export function getDirectoryTree(params) {
  return request({
    url: '/tree/getDirectoryTree',
    method: 'post',
    params
  })
}
