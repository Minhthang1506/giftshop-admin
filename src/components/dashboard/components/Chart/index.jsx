// import styles from "./chartStyles.module.scss";

// export default function () {}

import React from "react";
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
import { Line } from "react-chartjs-2";
import AjaxHelper from "../../../../services";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Revenue (VNĐ)",
            align: "start",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data2 = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => Math.floor(Math.random() * 10 + 1)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => Math.floor(Math.random() * 10 + 1)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export function App({ data }) {

    const simpleData = data?.map(order => ({totalPaid: order.totalPaid,createdAt: order?.createdAt?.toString().split("T")?.[0], status: order.status})).filter(item => item.status === "Success")
    
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});
    // simpleData.push({totalPaid: 10000, createdAt:"2021-5-12"});
    // simpleData.push({totalPaid: 120100, createdAt:"2022-5-12"});
    // simpleData.push({totalPaid: 12300, createdAt:"2021-6-9"});
    // simpleData.push({totalPaid: 21000, createdAt: "2021-4-12"});

    simpleData?.sort((a,b) => {
        return a?.createdAt?.split('-').join("").localeCompare(b.createdAt.split('-').join(""))
    })

    console.log(simpleData)

    const labels = simpleData.map(item => item.createdAt)

    var datasets = [
        {
            label: "Revenue",
            data: simpleData.map(item => item.totalPaid),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ];

    return <Line options={options} data={{labels,datasets}} />;
}
