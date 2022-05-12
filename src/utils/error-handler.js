export const errorHandler = (error, req, res, next) => {
  try {
    return res.json({
      error: error.message
    });
  } catch (e) {
    return res.json({
      error: e.mssage
    });
  }
};
