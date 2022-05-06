export const resHandler = (req, res, next) => {
  try {
    if (!res.data) {
      return next('404 not found');
    }
    res.status(req.method === 'POST' ? 201 : 200).send(res.data);
  } catch (err) {
    return next(err);
  }
};
