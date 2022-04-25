export const sortByDate = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};

export const sortByLength = (a, b, field) => {
  return b[field].length - a[field].length;
};
