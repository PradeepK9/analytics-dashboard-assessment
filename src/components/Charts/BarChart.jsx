import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VehiclesByMakeBarChart = ({ data }) => {
  // Calculate number of Make
  const makeCounts = data.reduce((acc, vehicle) => {
    acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(makeCounts),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(makeCounts),
        backgroundColor: "#dcb5ff",
      },
    ],
  };

  return (
    <div className="mb-16">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Number of Vehicles by Make" },
          },
        }}
      />
    </div>
  );
};

VehiclesByMakeBarChart.propTypes = {
  data: PropTypes.array,
};

export default VehiclesByMakeBarChart;
