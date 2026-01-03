// Goal Setter API with Express and TypeScript

import express from 'express';
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';

// Define TypeScript interface for Goal
interface Goal {
  id: number;
  title: string;
  description: string;
  targetDate: string; // ISO date string
  progress: number; // 0-100 percentage
  status: 'not-started' | 'in-progress' | 'completed';
}

// Create Express app
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Simple request logger for debugging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[req]', req.method, req.path, 'body:', req.body);
  next();
});

// In-memory storage for goals (in a real app, this would be a database)
let goals: Goal[] = [
  { id: 1, title: 'Learn Angular', description: 'Complete Angular fundamentals and build a project', targetDate: '2026-06-30', progress: 45, status: 'in-progress' },
  { id: 2, title: 'Run Marathon', description: 'Train and complete a full marathon', targetDate: '2026-09-15', progress: 20, status: 'in-progress' },
  { id: 3, title: 'Read 20 Books', description: 'Read 20 books to improve knowledge', targetDate: '2026-12-31', progress: 0, status: 'not-started' }
];

// GET all goals
app.get('/api/goals', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: goals
  });
});

// GET a specific goal by ID
app.get('/api/goals/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const goal = goals.find(g => g.id === id);
  
  if (!goal) {
    return res.status(404).json({
      success: false,
      message: 'Goal not found'
    });
  }
  
  res.json({
    success: true,
    data: goal
  });
});

// POST - Create a new goal
app.post('/api/goals', (req: Request, res: Response) => {
  const { title, description, targetDate, progress, status } = req.body;
  
  // Simple validation
  if (!title || description === undefined || !targetDate || progress === undefined || !status) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: title, description, targetDate, progress, status'
    });
  }
  
  const newGoal: Goal = {
    id: goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1,
    title,
    description,
    targetDate,
    progress: progress || 0,
    status: status || 'not-started'
  };
  
  goals.push(newGoal);
  
  res.status(201).json({
    success: true,
    data: newGoal
  });
});

// PUT - Update an existing goal
app.put('/api/goals/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const goalIndex = goals.findIndex(g => g.id === id);
  
  if (goalIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Goal not found'
    });
  }
  
  const { title, description, targetDate, progress, status } = req.body;
  
  // Simple validation
  if (!title || description === undefined || !targetDate || progress === undefined || !status) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: title, description, targetDate, progress, status'
    });
  }
  
  goals[goalIndex] = { id, title, description, targetDate, progress, status };
  
  res.json({
    success: true,
    data: goals[goalIndex]
  });
});

// DELETE a goal
app.delete('/api/goals/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const goalIndex = goals.findIndex(g => g.id === id);
  
  if (goalIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Goal not found'
    });
  }
  
  const deletedGoal = goals.splice(goalIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Goal deleted successfully',
    data: deletedGoal
  });
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Goal Setter API is running!',
    endpoints: {
      'GET /api/goals': 'Get all goals',
      'GET /api/goals/:id': 'Get a specific goal',
      'POST /api/goals': 'Create a new goal',
      'PUT /api/goals/:id': 'Update an existing goal',
      'DELETE /api/goals/:id': 'Delete a goal'
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Goal Setter API server is running at http://localhost:${port}`);
});
