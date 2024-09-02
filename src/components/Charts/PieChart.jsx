import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const VehicleTypePieChart = ({ data }) => {
  // Calculate number of Vehicle Type
  const typeCounts = data.reduce((acc, vehicle) => {
    acc[vehicle["Electric Vehicle Type"]] =
      (acc[vehicle["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: "# of Vehicles",
        data: Object.values(typeCounts),
        backgroundColor: [
          "#f96d00",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "right" },
          title: { display: true, text: "Vehicle Type Distribution" },
        },
      }}
    />
  );
};

VehicleTypePieChart.propTypes = {
  data: PropTypes.array,
};

export default VehicleTypePieChart;
