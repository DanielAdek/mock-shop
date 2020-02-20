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
 * @param {object} data request data to filter with
 * @return {*} object
 */
export const reportDuplicate = async (database, data) => {
  const report = await database.findOne({ where: data });
  return report ? 'negative' : 'positive';
};

/**
 * @method retreiveOneData
 * @param {object} database database to give
 * @param {object} data request data filter with
 * @return {*} object
 */
export const retreiveOneData = async (database, data) => {
  const result = await database.findOne({ where: data });
  return result;
};

/**
 * @method retreiveData
 * @param {object} database database to give
 * @return {*} object
 */
export const retreiveData = async (database) => {
  const result = await database.findAll();
  return result;
};

/**
 * @method expungeData
 * @desc This function will delete data
 * @param {object} database database to give
 * @param {object} data request data to delete
 * @return {*} object
 */
export const expungeData = async (database, data) => {
  const result = await database.destroy({ where: data });
  return result;
};

/**
 * @method modifyData
 * @desc This function will delete data
 * @param {object} database database to give
 * @param {object} data request data to update with
 * @param {object} filter request data filter with
 * @return {*} object
 */
export const modifyData = async (database, data, filter) => {
  const result = await database.update(data, { where: filter });
  return result;
};
