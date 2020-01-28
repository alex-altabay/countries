import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, List, ListItem, ListItemText } from "@material-ui/core";

import { API } from "../../api";
import { ResponceRegionType } from "./types";

const Regions = () => {
  const [regions, setRegions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    try {
      API.getAllRegions().then(data => {
        const regions: string[] = data.map(
          (item: ResponceRegionType) => item.region
        );
        const uniq: string[] = [...new Set(regions)];
        setRegions(uniq);
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoTORegion = (item: string) => {
    history.push(`/region/${item.toLowerCase()}`);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {regions && (
        <Container maxWidth='sm'>
          <List>
            {regions.map((item: string, index: number) => (
              <ListItem
                button
                key={index}
                onClick={() => handleGoTORegion(item)}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </div>
  );
};

export default Regions;
