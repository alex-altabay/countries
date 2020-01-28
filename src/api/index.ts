import axios from "axios";
import { Params } from "./types";

const SERVER_URL = "https://restcountries.eu/rest/v2";

const request = (route: string, params: Params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${SERVER_URL}${route}?${query}`;

  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const API = {
  getAllRegions: async () => await request("/all", { fields: "region" }),
  getCountries: async (region: string) =>
    await request(`/region/${region}`, { fields: "name;population" }),
  getCountry: async (country: string) => await request(`/name/${country}`)
};
