import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLoadAction,
  userApplyLoadJobAction,
} from "../../redux/actions/jobAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Text,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const Chart = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.adminCreateJob);
  const { jobStatusArr } = useSelector((state) => state.applyByUser);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    const id = user.role._id;
    dispatch(adminLoadAction(id));
  }, []);

  const admin = useSelector((state) => state.signIn);

  const jobStatusAvailableJobs = jobStatusArr?.availableJobs;
  const jobStatus = [];
  jobStatusAvailableJobs?.forEach((job) => {
    const temp = [];
    job?.userAppliedForJob.forEach((job2) => {
      temp.push(job2?.applicationStatus);
    });
    jobStatus.push(temp);
  });

  const FetchData = (admin) => {
    dispatch(userApplyLoadJobAction(admin.userInfo.role._id));
  };

  useEffect(() => {
    FetchData(admin);
  }, [admin]);

  const getJobsChartData = (jobs) => {
    if (!jobs) return [];

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);
    const endDate = new Date(today);

    const filteredJobs = jobs.filter((job) => {
      const createdAt = new Date(job.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });

    const jobCounts = {};
    filteredJobs.forEach((job) => {
      const createdAt = new Date(job.createdAt).toDateString();
      jobCounts[createdAt] = (jobCounts[createdAt] || 0) + 1;
    });

    const chartData = [];
    let currentDate = new Date(startDate);
    let totalCount = 0;
    while (currentDate <= endDate) {
      const date = currentDate.toDateString();
      const count = jobCounts[date] || 0;
      chartData.push({ date, count });
      totalCount += count;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { chartData, totalCount };
  };

  const { chartData, totalCount } = getJobsChartData(jobs);

  const applicationStatusCount = jobStatus.flat().reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Convert the application status count into an array of objects for PieChart
  const applicationStatusData = Object.entries(applicationStatusCount).map(
    ([status, count]) => ({
      status,
      count,
    })
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginLeft: 76,
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <div>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                <p>Total Jobs Created</p>
              </Typography>
              <Typography variant="h4">{jobs && jobs.length}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 60,
          justifyContent: "space-between",
        }}
      >
        {/* Vertical BarChart */}
        <div style={{ width: "800px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <span style={{ marginLeft: "60px" }}>
                Jobs Created in the Last 7 Days{" "}
              </span>
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                <YAxis type="number" />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </div>
        {/* Horizontal PieChart */}

        <div style={{ width: "800px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom marginLeft={25}>
              Application Status
            </Typography>
            <ResponsiveContainer
              width={600}
              height={400}
              backgroundColor="transparent"
            >
              <PieChart width={800} height={500}>
                <Pie
                  data={applicationStatusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={(entry) => entry.status}
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </div>
      </div>
    </>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <Text {...payload} angle={-45} verticalAnchor="start" />
    </g>
  );
};

export default Chart;
