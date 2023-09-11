
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { fetchFollowersReportsAsync } from './followersSlice';
import { WithLoadingSpinner } from '../../ui-components/withLoading';



export default function ReportsPage() {


    const dispatch = useAppDispatch();
    const followers = useSelector((state: RootState) => state.followers.followers);


    const [isReportLoading, setIsReportLoading] = useState(false)
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const destinations = followers.map((e: any) => e.destination.toUpperCase())
    console.log(followers);
    const followersData = followers.map((e: any) => e.amountOfFollowers)

    followersData.sort((a, b) => b - a);

    async function dataDispatchAction() {
        try {
            setIsReportLoading(true)
            await dispatch(fetchFollowersReportsAsync());
        } catch (error) {
            console.log(error);
        } finally {
            setIsReportLoading(false)
        }
    }

    useEffect(() => {
        dataDispatchAction();
    }, []);



    useEffect(() => {
        const data = {
            labels: [...destinations],
            datasets: [
                {
                    label: "Likes",
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
                    beginAtZero: true,
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [followers]);

    const csvData = followers.map((follower: any) => ({
        Destination: follower.destination,
        Followers: follower.amountOfFollowers
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
        <WithLoadingSpinner isLoading={isReportLoading}>
            <div className='chartDiv' >
                <CSVLink {...csvReport}><i className="pi pi-file-export"></i> Export to CSV</CSVLink>
                <h2 style={{ color: "#176B87" }}>Top-Rated Vacation Destinations</h2>
                <Chart className='chart' style={{ marginTop: "5%" }} type="bar" data={chartData} options={chartOptions} />
            </div>
        </WithLoadingSpinner>


    )
}




{/* <div style={{ backgroundColor: "#EFF3F8", padding: "4%", borderRadius: "10px" }} ></div>
</div> */}

