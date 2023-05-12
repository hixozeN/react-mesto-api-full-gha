const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const { MONGO_DB } = process.env.MONGO_DB;
const PORT = process.env.PORT || 3000;

module.exports = {
  SECRET, MONGO_DB, PORT,
};
