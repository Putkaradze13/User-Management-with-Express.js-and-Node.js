export const errorHandler = (error, req, res, next) => {
  try {
    res.status(400).send(error);
  } catch (e) {
    res.status(400).send(e);
  }
};
