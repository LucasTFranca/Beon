import axios from 'axios';

const baseUrl = 'http://localhost:4000';

export const getBooks = async () => {
  const { data } = await axios.get(`${baseUrl}/books`);

  data.sort((a, b) => a.year - b.year);

  return data;
};

export const getBooksWithSearchFilter = async (searchValue) => {
  const { data: authorData } = await axios.get(`${baseUrl}/books?author=${searchValue}`);
  const { data: titleData } = await axios.get(`${baseUrl}/books?title=${searchValue}`);
  const { data: languageData } = await axios.get(`${baseUrl}/books?language=${searchValue}`);

  const data = [...authorData, ...titleData, ...languageData];

  data.sort((a, b) => a.year - b.year);

  return data;
};

export const getBooksWithSearchFilterAndYear = async (searchValue, years) => {
  const { data: authorData } = await axios.get(`${baseUrl}/books/?author=${searchValue}&year_gte=${years.firstYear}&year_lte=${years.lastYear}`);
  const { data: titleData } = await axios.get(`${baseUrl}/books/?title=${searchValue}&year_gte=${years.firstYear}&year_lte=${years.lastYear}`);
  const { data: languageData } = await axios.get(`${baseUrl}/books/?language=${searchValue}&year_gte=${years.firstYear}&year_lte=${years.lastYear}`);

  const data = [...authorData, ...titleData, ...languageData];

  data.sort((a, b) => a.year - b.year);

  return data;
};
