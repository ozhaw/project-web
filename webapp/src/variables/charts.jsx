const chartDataTemplate = (labels, datasets) => {
    return {
        data: canvas => {
            return {
                labels: [...labels],
                datasets: [...datasets]
            };
        }
    }
};

const getBasicDataset = (data) => {
    return {
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        pointRadius: 1,
        pointHoverRadius: 1,
        borderWidth: 3,
        data: [...data],
        fill: true
    }
};

/*const dashboardEmailStatisticsChart = {
  data: canvas => {
    return {
      labels: [1, 2, 3],
      datasets: [
        {
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
          borderWidth: 0,
          data: [342, 480, 530, 120]
        }
      ]
    };
  }
};

const dashboardNASDAQChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: "#fbc658",
        backgroundColor: "transparent",
        pointBorderColor: "#fbc658",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      },
      {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: "#51CACF",
        backgroundColor: "transparent",
        pointBorderColor: "#51CACF",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      }
    ]
  }
};*/

export {chartDataTemplate, getBasicDataset}
