import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { ProjectTask } from '../../../store/types';

interface TimeDistanceChartProps {
    tasks: ProjectTask[];
}

export const TimeDistanceChart = ({ tasks }: TimeDistanceChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // Determine domains based on data
    const minChainage = useMemo(() => d3.min(tasks, d => d.startChainage) || 0, [tasks]);
    const maxChainage = useMemo(() => d3.max(tasks, d => d.endChainage) || 5000, [tasks]);
    const minDate = useMemo(() => d3.min(tasks, d => d.start) || new Date(), [tasks]);
    const maxDate = useMemo(() => d3.max(tasks, d => d.end) || new Date(), [tasks]);

    useEffect(() => {
        if (!containerRef.current || !svgRef.current || tasks.length === 0) return;

        const container = containerRef.current;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous render

        const { width, height } = container.getBoundingClientRect();
        const margin = { top: 20, right: 30, bottom: 30, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Scales
        // X Axis: Chainage (Distance)
        const xScale = d3.scaleLinear()
            .domain([minChainage, maxChainage])
            .range([0, innerWidth]);

        // Y Axis: Time (Schedule) - Time goes DOWN (standard for Gantt/Time-Location usually, or UP? 
        // User said "Sloped lines... steeper slopes indicate faster production". 
        // Usually Y is Time. Let's make Time go DOWN like a calendar? Or UP?
        // Let's assume Time goes DOWN for now (Top = Start Date).
        const yScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, innerHeight]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Axes
        const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d => `${d}m`);
        const yAxis = d3.axisLeft(yScale).ticks(10);

        // Grid lines
        g.append("g")
            .attr("class", "grid-lines opacity-10")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(() => ""));

        g.append("g")
            .attr("class", "grid-lines opacity-10")
            .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => ""));

        g.append("g")
            .attr("class", "x-axis text-xs font-mono text-gray-500")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis);

        g.append("g")
            .attr("class", "y-axis text-xs font-mono text-gray-500")
            .call(yAxis);

        // Draw Tasks
        g.selectAll(".task-line")
            .data(tasks)
            .enter()
            .append("line")
            .attr("x1", d => xScale(d.startChainage))
            .attr("y1", d => yScale(d.start))
            .attr("x2", d => xScale(d.endChainage))
            .attr("y2", d => yScale(d.end))
            .attr("stroke", d => {
                switch (d.type) {
                    case 'earthworks': return '#F59E0B'; // Amber
                    case 'paving': return '#3B82F6'; // Blue
                    case 'structures': return '#EF4444'; // Red
                    case 'drainage': return '#10B981'; // Emerald
                    default: return '#6B7280';
                }
            })
            .attr("stroke-width", 2)
            .attr("class", "cursor-pointer hover:opacity-80 transition-opacity")
            .on("mouseover", function (_event, _d) {
                d3.select(this)
                    .attr("stroke-width", 3)
                    .attr("opacity", 1);
            })// Tooltip logic could go here
            .on("mouseout", function () {
                d3.select(this).attr("stroke-width", 2);
            });

        // Add task labels (start points)
        g.selectAll(".task-label")
            .data(tasks)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.startChainage) + 5)
            .attr("y", d => yScale(d.start) - 5)
            .text(d => d.title.split(' ')[1]) // Short label
            .attr("fill", "white")
            .attr("font-size", "10px")
            .attr("opacity", 0.6);

    }, [tasks, minChainage, maxChainage, minDate, maxDate]);

    return (
        <div ref={containerRef} className="w-full h-full relative">
            <svg ref={svgRef} className="w-full h-full" />
        </div>
    );
};
