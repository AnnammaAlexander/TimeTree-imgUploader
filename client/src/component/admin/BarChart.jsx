// Import necessary libraries
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Sample data for the bar chart
const chartData = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Budget Report'
  },
  xAxis: {
    categories: ['Category 1', 'Category 2', 'Category 3']
  },
  yAxis: {
    title: {
      text: 'Value'
    }
  },
  series: [
    {
      name: 'Series 1',
      data: [10, 20, 30]
    },
    {
      name: 'Series 2',
      data: [5, 15, 25]
    }
  ]
};

// Create the BarChart component
const BarChart = () => (
  <HighchartsReact highcharts={Highcharts} options={chartData}  />
);

// Export the component
export default BarChart;