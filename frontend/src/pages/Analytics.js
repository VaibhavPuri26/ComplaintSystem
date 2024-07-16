import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const fetchComplaints = async () => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

    const response = await fetch('https://complaintsystem-2.onrender.com/api/GetAllComplaints', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return [];
  }
};

const Analytics = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({});
  const [complaintsPerDayData, setComplaintsPerDayData] = useState({});

  useEffect(() => {
    fetchComplaints().then(data => {
      if (Array.isArray(data)) {
        const departments = [...new Set(data.map(complaint => complaint.department))];
        const complaintsPerDepartment = departments.map(department =>
          data.filter(complaint => complaint.department === department).length
        );

        setChartData({
          labels: departments,
          datasets: [
            {
              label: 'Number of Complaints',
              data: complaintsPerDepartment,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });

        const dates = data.map(complaint => new Date(complaint.date).toLocaleDateString());
        const uniqueDates = [...new Set(dates)];
        const complaintsPerDay = uniqueDates.map(date =>
          data.filter(complaint => new Date(complaint.date).toLocaleDateString() === date).length
        );

        setComplaintsPerDayData({
          labels: uniqueDates,
          datasets: [
            {
              label: 'Number of Complaints Per Day',
              data: complaintsPerDay,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        });
      }
    });
  }, []);

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="container mt-4">
      <h1 className="alert alert-info text-center">Analytics</h1>
      <button className="btn btn-primary mb-4" onClick={handleGoToAdmin}>
        Back to Admin
      </button>
      <div className="charts-container">
        <div className="chart-item">
          {chartData.labels && chartData.labels.length > 0 && (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Complaints per Department',
                  },
                },
              }}
            />
          )}
        </div>
        <div className="chart-item">
          {complaintsPerDayData.labels && complaintsPerDayData.labels.length > 0 && (
            <Line
              data={complaintsPerDayData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Complaints Registered Per Day',
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Complaints',
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
