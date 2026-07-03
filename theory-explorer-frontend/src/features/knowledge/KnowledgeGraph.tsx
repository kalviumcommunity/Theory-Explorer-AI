import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
    return newNode;
  });

  return { nodes: newNodes, edges };
};

export function KnowledgeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await api.get('/concepts/graph');
        const rawNodes = response.data.data.nodes;
        const rawEdges = response.data.data.edges;
        
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          rawNodes,
          rawEdges
        );
        
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      } catch (error) {
        console.error("Failed to fetch graph data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGraph();
  }, []);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onNodeClick = useCallback((event: any, node: any) => {
    navigate(`/knowledge/${node.id}`);
  }, [navigate]);

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center">Loading Interactive Graph...</div>;
  }

  return (
    <div className="w-full h-[80vh] border rounded-lg overflow-hidden bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Panel position="top-left" className="bg-white p-4 rounded-lg shadow-md border text-sm">
          <strong className="text-lg text-primary-600">Global Knowledge Map</strong>
          <p className="text-gray-500 mt-1">Scroll to zoom. Drag to pan. Click a concept to start learning.</p>
        </Panel>
        <Controls />
        <MiniMap />
        <Background gap={16} size={1.5} color="#e2e8f0" />
      </ReactFlow>
    </div>
  );
}
