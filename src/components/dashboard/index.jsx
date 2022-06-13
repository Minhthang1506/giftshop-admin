import styles from "./dashboard.module.scss";

import CardReport from "./components/CardReport";
import { App } from "./components/Chart";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useState, useEffect } from "react";
import AjaxHelper from "../../services";

const Dashboard = () => {
    const [fromDate, setFromDate] = useState(new Date(Date.now()));
    const [toDate, setToDate] = useState(new Date(Date.now()));
    const [data, setData] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [sold, setSold] = useState(0);
    const [success, setSuccess] = useState(0);
    const [canceled, setCanceled] = useState(0);

    const handleFromChange = (newValue) => {
        setFromDate(newValue);
    };

    const handleToChange = (newValue) => {
        setToDate(newValue);
    };

    useEffect(() => {
        var query = {
            From: fromDate.toISOString().split("T")[0],
            To: toDate.toISOString().split("T")[0],
            AllStatus: "true",
        };
        const getData = async () => {
            var result = await AjaxHelper.getList("orders/report", { query });
            setData(result);
        };

        getData();
    }, [fromDate, toDate]);

    useEffect(() => {
        var newRevenue = 0;
        for (var order of data) {
            if (order.status === 'Success')
            newRevenue += order.totalPaid;
        }

        var newSold = 0;
        for (var order of data) {
            for (var item of order.items) {
                if (order.status === 'Success')
                newSold += item.quantity;
            }
        }

        var newSuccess = data?.filter((order) => order.status === "Success").length;

        var newCanceled = data?.filter((order) => order.status === "Canceled").length;

        setRevenue(Math.round(newRevenue));
        setSold(newSold);
        setSuccess(newSuccess);
        setCanceled(newCanceled);
    }, [data]);

    return (
        <div className={styles.box}>
            <div className={styles.filter}>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="FROM"
                            inputFormat="MM/dd/yyyy"
                            value={fromDate}
                            onChange={handleFromChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="TO"
                            inputFormat="MM/dd/yyyy"
                            value={toDate}
                            onChange={handleToChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className={styles.card_area}>
                <CardReport
                    ccstyle = {{width: "fit-content"}}
                    backgroundColor={"green"}
                    data={revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "  VNĐ"}
                    title={"Revenue"}
                ></CardReport>
                <CardReport
                    backgroundColor={"#436d43"}
                    data={sold}
                    title={"Sold Items"}
                ></CardReport>
                <CardReport
                    backgroundColor={"#8fb14e"}
                    data={success}
                    title={"Success Orders"}
                ></CardReport>
                <CardReport
                    backgroundColor={"#b93b3b"}
                    data={canceled}
                    title={"Canceled Orders"}
                ></CardReport>
            </div>
            <App data = {data}></App>
        </div>
    );
};

export default Dashboard;
