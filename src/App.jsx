import { useEffect, useState } from "react";
import { parseCSV } from "./utils/parseCSV";
import VehiclesByMakeBarChart from "./components/Charts/BarChart";
import VehicleTypePieChart from "./components/Charts/PieChart";
import ElectricRangeLineChart from "./components/Charts/LineChart";
import DataTable from "./components/DataTable/DataTable";
import Filters from "./components/Filters/Filters";
import { Container, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    County: "",
    Make: "",
    "Model Year": "",
  });
  const [uniqueValues, setUniqueValues] = useState({
    County: [],
    Make: [],
    "Model Year": [],
  });

  useEffect(() => {
    // Fetch and parse CSV data
    fetch("/data-to-visualize/Electric_Vehicle_Population_Data.csv")
      .then((response) => response.text())
      .then((csvText) => parseCSV(new Blob([csvText])))
      .then((parsedData) => {
        console.log(parsedData);
        setData(parsedData);
        setFilteredData(parsedData);
        // Extract unique values for filters
        const uniqueCounties = [
          ...new Set(parsedData.map((item) => item.County)),
        ];
        const uniqueMakes = [...new Set(parsedData.map((item) => item.Make))];
        const uniqueModelYears = [
          ...new Set(parsedData.map((item) => item["Model Year"])),
        ];
        setUniqueValues({
          County: uniqueCounties,
          Make: uniqueMakes,
          "Model Year": uniqueModelYears,
        });
      })
      .catch((error) => console.error("Error parsing CSV:", error));
  }, []);

  useEffect(() => {
    // Apply filters
    let tempData = [...data];
    if (filters.County) {
      tempData = tempData.filter((item) => item.County === filters.County);
    }
    if (filters.Make) {
      tempData = tempData.filter((item) => item.Make === filters.Make);
    }
    if (filters["Model Year"]) {
      tempData = tempData.filter(
        (item) => item["Model Year"] === filters["Model Year"]
      );
    }
    setFilteredData(tempData);
  }, [filters, data]);

  return (
    <Container className="py-8">
      <Typography variant="h4" align="center" gutterBottom>
        Electric Vehicle Dashboard
      </Typography>

      {/* Filters */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        uniqueValues={uniqueValues}
      />

      {/* Charts */}
      <VehiclesByMakeBarChart data={filteredData} />
      <Divider style={{ backgroundColor: "lightgray", height: 2 }} />
      <div className="flex justify-center items-center">
        <div className="w-3/4">
          <VehicleTypePieChart data={filteredData} />
        </div>
      </div>
      <Divider style={{ backgroundColor: "lightgray", height: 2 }} />
      <ElectricRangeLineChart data={filteredData} />
      <Divider style={{ backgroundColor: "lightgray", height: 2 }} />

      {/* Data Table */}
      <div className="my-16">
        <Typography variant="h5">Detailed Data</Typography>
        <DataTable data={filteredData} />
      </div>
    </Container>
  );
}

export default App;
