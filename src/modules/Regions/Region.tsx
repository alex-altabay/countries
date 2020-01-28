import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";
import styled from "styled-components";

import { API } from "../../api";
import { CountriesType } from "./types";

const Region = () => {
  const [countries, setCountries] = useState<CountriesType[] | null>(null);
  const [sortedCountries, setSortedCountries] = useState<
    CountriesType[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"name" | "population">("name");
  const { region } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    if (region) {
      try {
        API.getCountries(region).then(data => {
          setCountries(data);
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [region]);

  const desc = (
    a: CountriesType,
    b: CountriesType,
    orderBy: "name" | "population"
  ) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    if (countries) {
      const result = countries
        .sort(
          order === "desc"
            ? (a, b) => desc(a, b, orderBy)
            : (a, b) => -desc(a, b, orderBy)
        )
        .slice();
      setSortedCountries(result);
    }
  }, [order, orderBy, countries]);

  const handleSort = (property: "name" | "population") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleGoToCountry = (name: string) => {
    history.push(`/${name.toLowerCase()}`);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {sortedCountries && (
        <Container maxWidth='sm'>
          <Table>
            <TableHead>
              <CustomHeaderRow>
                <TableCell
                  onClick={() => handleSort("name")}
                  sortDirection={orderBy === "name" ? order : "asc"}
                >
                  Country
                </TableCell>
                <TableCell
                  align='right'
                  onClick={() => handleSort("population")}
                  sortDirection={orderBy === "population" ? order : "asc"}
                >
                  Population
                </TableCell>
              </CustomHeaderRow>
            </TableHead>
            <TableBody>
              {sortedCountries.map(country => (
                <CustomRow
                  hover
                  key={country.name}
                  onClick={() => handleGoToCountry(country.name)}
                >
                  <TableCell>
                    <Typography variant='subtitle2'>{country.name}</Typography>
                  </TableCell>

                  <TableCell align='right'>{country.population}</TableCell>
                </CustomRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      )}
    </div>
  );
};

const CustomRow = styled(TableRow)`
  cursor: pointer;
`;

const CustomHeaderRow = styled(CustomRow)`
  background: #C7C6C1
`;

export default Region;
