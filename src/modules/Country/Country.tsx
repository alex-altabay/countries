import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";
import styled from "styled-components";

import { API } from "../../api";
import { countryDataType } from "./types";

const Country = () => {
  const [countryData, setCountryData] = useState<countryDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { country } = useParams();

  useEffect(() => {
    setLoading(true);
    if (country) {
      try {
        API.getCountry(country).then(data => {
          data.length && setCountryData(data[0]);
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [country]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {countryData && (
        <Container maxWidth='sm'>
          <Typography variant='h3'>{countryData.name}</Typography>

          <CustomImg
            src={countryData && countryData.flag}
            alt={`${countryData.name} flag`}
          />

          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Capital</Typography>
                </TableCell>
                <TableCell align='right'>{countryData.capital}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Region</Typography>
                </TableCell>
                <TableCell align='right'>{countryData.region}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Subregion</Typography>
                </TableCell>
                <TableCell align='right'>{countryData.subregion}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Population</Typography>
                </TableCell>
                <TableCell align='right'>{countryData.population}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Area</Typography>
                </TableCell>
                <TableCell align='right'>{countryData.area}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Timezones</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography>
                    {countryData.timezones && countryData.timezones.join(", ")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Container>
      )}
    </div>
  );
};

const CustomImg = styled.img`
  width: 100%;
  margin: 2rem 0;
`;

export default Country;
