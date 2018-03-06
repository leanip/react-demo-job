export const getRedirectPath = ({ avatar, type }) => {
  let url = type === 'boss' ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}