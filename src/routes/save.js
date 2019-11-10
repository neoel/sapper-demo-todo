
export function post (req, res) {
  if (req.body) {
    req.session.todos = req.body.todos
  }

  res.end()
}
