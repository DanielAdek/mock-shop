/**
 * @method create
 * @param {object} database database to receive
 * @param {object} data request data to create
 * @return {*} object
 */
export const insertToDataBase = (database, data) => {
  const response = database.create(data);
  return response;
};

/**
 * @method create
 * @param {object} database database to give
 * @param {object} data request data to create
 * @return {*} object
 */
export const reportDuplicate = async (database, data) => {
  const report = await database.findOne({ where: data });
  return report ? 'negative' : 'positive';
};
