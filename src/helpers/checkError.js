export const checkError = (error) => {
  if (error.response) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
};
