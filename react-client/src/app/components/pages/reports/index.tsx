
import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import { Chart } from 'primereact/chart';
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { fetchFollowersAsync } from '../adminVacations/vacationSlice';
import { CSVLink } from "react-csv";


export default function ReportsPage() {


    const dispatch = useAppDispatch();
    const followers = useSelector((state: RootState) => state.vacations.followers);
    // const navigate = useNavigate()



    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const destinations = followers.map((e: any) => e.destination)
    console.log(followers);
    const followersData = followers.map((e: any) => e.vacationCount)


    useEffect(() => {
        dispatch(fetchFollowersAsync());
        const data = {
            labels: [...destinations],
            datasets: [
                {
                    label: "Destinations",
                    data: [...followersData],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    const csvData = followers.map((follower: any) => ({
        Destination: follower.destination,
        Followers: follower.vacationCount
    }));

    const csvHeaders = [
        { label: 'Destination', key: 'Destination' },
        { label: 'Followers', key: 'Followers' }
    ];

    const csvReport = {
        data: csvData,
        headers: csvHeaders,
        filename: 'Vacations_Report.csv'
    };

    return (
        <div style={{ backgroundColor: "#EFF3F8", padding: "4%", borderRadius: "10px" }} >
            <CSVLink {...csvReport}>Export to CSV</CSVLink>
            <Chart style={{ minWidth: "700px" }} type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}






