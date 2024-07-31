const successfulResponse = ({ res, data, message, meta }) => {
  return res.status(200).json({
    status: true,
    message,
    meta,
    data,
  });
};

const createdResponse = ({ res, data, message }) => {
  return res.status(201).json({
    status: true,
    message,
    data,
  });
};

const badRequestResponse = ({ res, data, message }) => {
  return res.status(400).json({
    status: false,
    message,
    data,
  });
};

const serverErrorResponse = ({ res, data, message }) => {
  return res.status(500).json({
    status: false,
    message,
    data,
  });
};


const unauthorizedResponse = ({ response, data, message }) => {
  return response.status(401).json({
    status: false,
    message,
    data,
  });
};

export {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
  unauthorizedResponse,
};
