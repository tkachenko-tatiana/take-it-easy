
export default (err, req, res, next) => {
  if (err.message === 'jwt expired') {
    return res.json({ errors: [{ message: 'jwt expired' }] })
  }
  next(err)
}
