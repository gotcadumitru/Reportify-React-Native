export const sortByDate = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};

export const sortByLength = (a, b, field) => {
  return b[field].length - a[field].length;
};

export function filteredByType(posts, type) {
  switch (type) {
    case 'popular':
      return posts.sort((a, b) => sortByLength(a, b, 'likes'));
    case 'date':
      return posts.sort(sortByDate);
    case 'distance':
      return posts.sort((a, b) => sortByLength(a, b, 'distance'));
    default:
      return posts;
  }
}

export function filterByDate(post, filters) {
  const {startDate, endDate} = filters;
  if (startDate && endDate) {
    return (
      new Date(post.createdAt) >= startDate &&
      new Date(post.createdAt) <= endDate
    );
  } else if (startDate && !endDate) {
    return new Date(post.createdAt) >= startDate;
  } else if (!startDate && endDate) {
    return new Date(post.createdAt) >= startDate;
  }
  return true;
}

export function distanceFilter(post, filters) {
  const {isDistance} = filters;
  if (!isDistance) return true;
  const checkDistance = _.inRange(
    post.distance,
    filters.distance[0],
    filters.distance[1],
  );
  return checkDistance;
}
