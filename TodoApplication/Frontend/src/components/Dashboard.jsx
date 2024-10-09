import {Bar,Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


export default function Dashboard({todos}){
    console.log(`Inside the dashboard component`)
    console.log(todos);
    // eslint-disable-next-line react/prop-types
    const completedtask = todos.filter((todo) => todo.completed === true).length;

     // eslint-disable-next-line react/prop-types
    const pendingtask = todos.length - completedtask;
    console.log(`Completedtask ${completedtask}`);
    console.log(`pending ${pendingtask}`);


  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedtask, pendingtask],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <div style={{ width: '30%', margin: 'auto' }}>
        <Pie data={pieData} />
      </div>
     
    </div>
  );

}