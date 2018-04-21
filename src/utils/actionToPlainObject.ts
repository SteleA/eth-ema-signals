export const actionToPlainObject = () => (next: any) => (action: any) => {
  if (isObjectLike(action)) {
    return next({ ...action })
  }
  throw new Error(`action must be an object: ${action}`)
}
function isObjectLike(val: any) {
  return isPresent(val) && typeof val === 'object'
}
function isPresent(obj: any) {
  return obj !== undefined && obj !== null
}
