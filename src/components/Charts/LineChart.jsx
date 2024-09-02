import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ElectricRangeLineChart = ({ data }) => {
  // Calculate average Electric Range by Model Year
  const rangeByYear = data.reduce((acc, vehicle) => {
    const year = vehicle["Model Year"];
    if (!acc[year]) {
      acc[year] = { total: 0, count: 0 };
    }
    acc[year].total += vehicle["Electric Range"];
    acc[year].count += 1;
    return acc;
  }, {});

  const years = Object.keys(rangeByYear).sort();
  const avgRange = years.map((year) =>
    rangeByYear[year].count > 0
      ? (rangeByYear[year].total / rangeByYear[year].count).toFixed(2)
      : 0
  );

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Average Electric Range",
        data: avgRange,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="mt-8 mb-16">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Average Electric Range Over Model Years",
            },
          },
        }}
      />
    </div>
  );
};

ElectricRangeLineChart.propTypes = {
  data: PropTypes.array,
};

export default ElectricRangeLineChart;
