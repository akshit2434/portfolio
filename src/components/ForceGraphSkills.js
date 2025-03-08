'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as d3 from 'd3';

const graphData = {
  nodes: [
    { id: 'Full Stack', group: 'category', val: 25, x: 0.5, y: 0.3 },
    { id: 'AI & ML', group: 'category', val: 25, x: 0.8, y: 0.7 },
    { id: 'Other', group: 'category', val: 25, x: 0.2, y: 0.7 },
    
    { id: 'HTML', group: 'full-stack', val: 10, x: 0.3, y: 0.1 },
    { id: 'CSS', group: 'full-stack', val: 10, x: 0.4, y: 0.1 },
    { id: 'JavaScript', group: 'full-stack', val: 12, x: 0.5, y: 0.1 },
    { id: 'React', group: 'full-stack', val: 12, x: 0.6, y: 0.1 },
    { id: 'Node.js', group: 'full-stack', val: 11, x: 0.7, y: 0.2 },
    { id: 'Python', group: 'full-stack', val: 11, x: 0.3, y: 0.2 },
    { id: 'MongoDB', group: 'full-stack', val: 10, x: 0.5, y: 0.2 },
    
    { id: 'LangChain', group: 'ai-ml', val: 11, x: 0.85, y: 0.4 },
    { id: 'LangGraph', group: 'ai-ml', val: 10, x: 0.9, y: 0.5 },
    { id: 'LLMs', group: 'ai-ml', val: 12, x: 0.95, y: 0.6 },
    { id: 'Pydantic-AI', group: 'ai-ml', val: 10, x: 0.9, y: 0.7 },
    { id: 'RAG Agents', group: 'ai-ml', val: 11, x: 0.85, y: 0.8 },
    
    { id: 'DSA', group: 'other', val: 11, x: 0.15, y: 0.4 },
    { id: 'System Design', group: 'other', val: 11, x: 0.1, y: 0.5 },
    { id: 'JS Libraries', group: 'other', val: 10, x: 0.05, y: 0.6 },
    { id: 'Git/GitHub', group: 'other', val: 10, x: 0.1, y: 0.7 },
    { id: 'C++', group: 'other', val: 11, x: 0.15, y: 0.8 },
  ],
  links: [
    { source: 'Full Stack', target: 'HTML', value: 1 },
    { source: 'Full Stack', target: 'CSS', value: 1 },
    { source: 'Full Stack', target: 'JavaScript', value: 1 },
    { source: 'Full Stack', target: 'React', value: 1 },
    { source: 'Full Stack', target: 'Node.js', value: 1 },
    { source: 'Full Stack', target: 'Python', value: 1 },
    { source: 'Full Stack', target: 'MongoDB', value: 1 },
    
    { source: 'AI & ML', target: 'LangChain', value: 1 },
    { source: 'AI & ML', target: 'LangGraph', value: 1 },
    { source: 'AI & ML', target: 'LLMs', value: 1 },
    { source: 'AI & ML', target: 'Pydantic-AI', value: 1 },
    { source: 'AI & ML', target: 'RAG Agents', value: 1 },
    
    { source: 'Other', target: 'DSA', value: 1 },
    { source: 'Other', target: 'System Design', value: 1 },
    { source: 'Other', target: 'JS Libraries', value: 1 },
    { source: 'Other', target: 'Git/GitHub', value: 1 },
    { source: 'Other', target: 'C++', value: 1 },
    
    { source: 'JavaScript', target: 'React', value: 0.5 },
    { source: 'JavaScript', target: 'Node.js', value: 0.5 },
    { source: 'Python', target: 'LangChain', value: 0.5 },
    { source: 'Python', target: 'LLMs', value: 0.5 },
    { source: 'JavaScript', target: 'JS Libraries', value: 0.5 },
  ]
};

const getColorByGroup = (group) => {
  switch(group) {
    case 'category':
      return '#2a4858';
    case 'full-stack':
      return '#2c5282';
    case 'ai-ml':
      return '#276749';
    case 'other':
      return '#975a16';
    default:
      return '#666';
  }
};

export default function ForceGraphSkills() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const links = svg.append('g')
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke', '#666')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', d => d.value === 1 ? 2 : 1);

    const nodes = svg.append('g')
      .selectAll('g')
      .data(graphData.nodes)
      .join('g');

    const getRadius = (d) => {
      const isMobile = width < 768;
      const scaleFactor = isMobile ? 0.75 : 1;
      
      if (d.group === 'category') return 50 * scaleFactor;
      const textLength = d.id.length;
      return Math.max(35, textLength * 4.5) * scaleFactor;
    };

    nodes.append('circle')
      .attr('r', getRadius)
      .attr('fill', d => getColorByGroup(d.group))
      .attr('fill-opacity', d => d.group === 'category' ? 1 : 0.25)
      .attr('stroke', d => getColorByGroup(d.group))
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.8)
      .style('cursor', 'grab');

    const wrapText = (text, width) => {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/);
        const lineHeight = 1.2;
        let line = [];
        let lineNumber = 0;
        
        text.text(null);

        if (words.length === 1) {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '0em')
            .text(words[0]);
          return;
        }

        let tspan = text.append('tspan')
          .attr('x', 0)
          .attr('dy', `-${(words.length - 1) * lineHeight * 0.5}em`);

        words.forEach((word, i) => {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node().getComputedTextLength() > width && line.length > 1) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = text.append('tspan')
              .attr('x', 0)
              .attr('dy', `${lineHeight}em`)
              .text(word);
          }
        });
      });
    };

    nodes.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', d => {
        const isMobile = width < 768;
        if (d.group === 'category') {
          return isMobile ? '13px' : '15px';
        }
        return isMobile ? '11px' : '13px';
      })
      .style('font-weight', d => d.group === 'category' ? '600' : '500')
      .style('pointer-events', 'none')
      .call(wrapText, 70);

    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.links)
        .id(d => d.id)
        .distance(width < 768 ? 100 : 140))
      .force('charge', d3.forceManyBody()
        .strength(d => {
          const isMobile = width < 768;
          return d.group === 'category'
            ? (isMobile ? -375 : -500)
            : (isMobile ? -150 : -200);
        }))
      .force('collide', d3.forceCollide().radius(d => getRadius(d) + 15))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.select(event.sourceEvent.target).style('cursor', 'grabbing');
      })
      .on('drag', (event, d) => {
        d.fx = Math.max(getRadius(d), Math.min(width - getRadius(d), event.x));
        d.fy = Math.max(getRadius(d), Math.min(height - getRadius(d), event.y));
        simulation.alpha(0.3).restart();
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        d3.select(event.sourceEvent.target).style('cursor', 'grab');
      });

    nodes.call(drag);

    simulation.on('tick', () => {
      nodes.each(d => {
        d.x = Math.max(getRadius(d), Math.min(width - getRadius(d), d.x));
        d.y = Math.max(getRadius(d), Math.min(height - getRadius(d), d.y));
      });

      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      svg.attr('width', newWidth);
      simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
      simulation.alpha(1).restart();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      simulation.stop();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '600px' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
