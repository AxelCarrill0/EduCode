function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function badRequest(message, details) {
  const error = new Error(message);
  error.status = 400;
  error.details = details;
  return error;
}

function unauthorized(message = 'No autorizado') {
  const error = new Error(message);
  error.status = 401;
  return error;
}

function notFound(message = 'No encontrado') {
  const error = new Error(message);
  error.status = 404;
  return error;
}

module.exports = {
  asyncHandler,
  badRequest,
  unauthorized,
  notFound,
};
