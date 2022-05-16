export const getAllUsersFilter = (filter) => {
  const newFilter = {};
  filter.split(',').forEach((filter) => {
    const [key, value] = filter.split('==');
    newFilter[key] = value;
  });
  return newFilter;
};
