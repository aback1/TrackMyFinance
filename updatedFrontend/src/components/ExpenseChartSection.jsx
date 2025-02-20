import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../styles/ExpenseChartSection.css";

const chartData = [
    { name: "House", value: 41.35 },
    { name: "Car", value: 23.45 },
    { name: "Food", value: 15.2 },
    { name: "Other", value: 20.0 },
];

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#E74C3C", "#1ABC9C",
    "#D35400", "#2ECC71", "#5D6D7E", "#F4D03F", "#DFFF00", "#40E0D0", "#6495ED",
    "#DC143C", "#7FFF00", "#FF69B4", "#8A2BE2", "#5F9EA0", "#CD5C5C", "#FF6347",
    "#4682B4", "#2E8B57", "#FF4500", "#DA70D6", "#32CD32", "#BA55D3", "#FFD700",
    "#7B68EE", "#00FA9A", "#FFA07A", "#20B2AA", "#778899", "#FF00FF", "#B22222",
    "#A52A2A", "#000080", "#ADFF2F", "#B0C4DE", "#8B008B", "#7CFC00", "#BDB76B",
    "#00CED1", "#8FBC8F", "#FF1493", "#E9967A", "#9932CC", "#FA8072", "#87CEEB",
    "#F0E68C"
];

export default function ExpenseChartSection() {
    return (
        <section className="expense-chart-section">
            <h3>Expenses by category</h3>
            <div className="chart-container">
                <PieChart width={220} height={220}>
                    <Pie
                        data={chartData}
                        cx={110}
                        cy={110}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            <div className="chart-legend">
                {chartData.map((entry, index) => (
                    <div key={index} className="legend-item">
            <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
                        <span className="legend-text">
              {entry.name} - {entry.value}%
            </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
