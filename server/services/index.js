/**
 * @method create
 * @param {object} database database to receive
 * @param {object} data request data to create
 * @return {*} object
 */
export const insertToDataBase = async (database, data) => database.create(data);

/**
 * @method reportDuplicate
 * @param {object} database database to give
 * @param {object} data request data to create
 * @return {*} object
 */
export const reportDuplicate = async (database, data) => {
  const report = await database.findOne({ where: data });
  return report ? 'negative' : 'positive';
};

/**
 * @method retreiveData
 * @param {object} database database to give
 * @param {object} data request data to create
 * @return {*} object
 */
export const retreiveOneData = async (database, data) => {
  const result = await database.findOne({ where: data });
  return result;
};
