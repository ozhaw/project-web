import React from "react";
import LinePeakGraphCard from "./LinePeakGraphCard";

class LineDotGraphCard extends LinePeakGraphCard {
    constructor(props) {
        super(props);

        this.options = {
            legend: {
                display: false
            },

            pieceLabel: {
                render: "percentage",
                fontColor: ["white"],
                precision: 2
            },

            tooltips: {
                enabled: false
            },

            scales: {
                yAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: "transparent",
                            color: "rgba(255,255,255,0.05)"
                        }
                    }
                ],

                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            display: false
                        }
                    }
                ]
            }
        };
    }
}

export default LineDotGraphCard;
