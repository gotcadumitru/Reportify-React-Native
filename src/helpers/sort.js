export const sortByDate = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};
