import db from './dbConnection';
const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;
const onError = async (err, req, res, next) => {
  await db.disconnect();
  res.satatus(500).send({ message: err.toString() });
};
export { getError, onError };
