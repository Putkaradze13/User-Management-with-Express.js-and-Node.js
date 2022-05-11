export const filterBody = (fields) => (req, res, next) => {
  const reqBody = {};
  fields.forEach((field) => {
    reqBody[field] = req.body[field];
  });
  req.body = reqBody;
  next();
};
