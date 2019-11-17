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

export {chartDataTemplate, getBasicDataset}
