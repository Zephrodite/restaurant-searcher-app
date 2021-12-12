import { SearchResult } from "@/interfaces/SearchResults";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getSearchResults = async (): Promise<AxiosResponse<SearchResult[]>> =>
  await axios.get("/searchresults");

export const getSearchResult = async (id: string): Promise<AxiosResponse<SearchResult>> =>
  await axios.get(`/searchresults/${id}`);

export const createSearchResult = async (searchresult: SearchResult): Promise<AxiosResponse> =>
  await axios.post("/searchresults", searchresult);
