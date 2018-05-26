
export default (options) => {
  return (req, res, next) => {
    req.initialState = JSON.stringify({})
    next()
  }
}
