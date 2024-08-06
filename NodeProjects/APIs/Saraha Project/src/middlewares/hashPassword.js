import bcrypt from 'bcrypt';
function hashPassword(req, res, next) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  req.body.password = hash;
  next();
}
export  { hashPassword };