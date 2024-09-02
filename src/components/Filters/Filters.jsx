import { Select, MenuItem, InputLabel, FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";

const Filters = ({ filters, setFilters, uniqueValues }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: "20px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>County</InputLabel>
          <Select name="County" value={filters.County} onChange={handleChange}>
            <MenuItem value="">All</MenuItem>
            {uniqueValues.County.map((county) => (
              <MenuItem key={county} value={county}>
                {county}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Make</InputLabel>
          <Select name="Make" value={filters.Make} onChange={handleChange}>
            <MenuItem value="">All</MenuItem>
            {uniqueValues.Make.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Model Year</InputLabel>
          <Select
            name="Model Year"
            value={filters["Model Year"]}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueValues["Model Year"].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

Filters.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  uniqueValues: PropTypes.object,
};

export default Filters;
