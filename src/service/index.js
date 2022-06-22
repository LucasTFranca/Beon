import axios from 'axios';

const baseUrl = 'http://localhost:4000';

// eslint-disable-next-line import/prefer-default-export
export const getAllBooks = async () => {
  const { data } = await axios.get(`${baseUrl}/books`);

  return data;
};
