import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ todos }) {
  // Get the number of completed tasks
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const remainingTasks = todos.length - completedTasks;

  const data = {
    datasets: [
      {
        data: [completedTasks, remainingTasks],
        backgroundColor: ["#754ae4", "#e0e0e0"], // Custom color for completed and unfilled portion
        borderColor: ["#f1ecff"],
        borderWidth: 15,
        cutout: "85%",
        // borderJoinStyle: 'round',
      },
    ],
    
  };


  const options = {
    plugins: {
      tooltip: { enabled: true }, // Tooltip will still be enabled
      legend: {
        display: false, // Hide the legend
      },
    },
  };


  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div  className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold text-[#754ae4]">
        <div>{((completedTasks / todos.length) * 100).toFixed(1)}%</div>
      </div>
    </div>
  );
}
