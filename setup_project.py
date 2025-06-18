\`\`\`python
import os
import json
import shutil

# Setup project directories
print("Setting up project directories...")

# Define project structure
base_dir = os.getcwd()
project_dir = os.path.join(base_dir, "supermodel-ai")
backend_dir = os.path.join(project_dir, "backend")
frontend_dir = os.path.join(project_dir, "frontend")
output_dir = "/home/user/output"

# Create directories if they don't exist
for directory in [project_dir, backend_dir, frontend_dir, output_dir]:
    os.makedirs(directory, exist_ok=True)

# Backend directories
backend_directories = [
    "src/controllers",
    "src/services",
    "src/middleware",
    "src/models",
    "src/routes",
    "src/utils",
    "src/types",
    "src/config",
    "src/jobs",
    "scripts"
]

for directory in backend_directories:
    os.makedirs(os.path.join(backend_dir, directory), exist_ok=True)

# Frontend directories
frontend_directories = [
    "src/components/common",
    "src/components/layout",
    "src/components/ai",
    "src/components/marketplace",
    "src/components/auth",
    "src/pages",
    "src/hooks",
    "src/services",
    "src/store",
    "src/types",
    "src/utils",
    "src/assets",
    "public"
]

for directory in frontend_directories:
    os.makedirs(os.path.join(frontend_dir, directory), exist_ok=True)

print("Project structure created successfully.")

# Backend package.json
backend_package = {
    "name": "supermodel-ai-backend",
    "version": "1.0.0",
    "description": "Backend for SuperModel AI platform",
    "main": "dist/index.js",
    "scripts": {
        "start": "node dist/index.js",
        "build": "tsc",
        "dev": "ts-node-dev --respawn src/index.ts",
        "migrate": "node scripts/migrate.js",
        "seed": "node scripts/seed.js",
        "lint": "eslint 'src/**/*.{ts,tsx}'",
        "test": "jest"
    },
    "dependencies": {
        "express": "^4.18.2",
        "typescript": "^5.1.3",
        "pg": "^8.11.0",
        "mongoose": "^7.2.2",
        "jsonwebtoken": "^9.0.0",
        "bcryptjs": "^2.4.3",
        "socket.io": "^4.6.2",
        "openai": "^4.0.0",
        "bull": "^4.10.4",
        "winston": "^3.8.2",
        "dotenv": "^16.0.3",
        "cors": "^2.8.5",
        "helmet": "^7.0.0",
        "express-rate-limit": "^6.7.0",
        "express-validator": "^7.0.1",
        "crypto": "^1.0.1"
    },
    "devDependencies": {
        "@types/express": "^4.17.17",
        "@types/node": "^20.2.5",
        "@types/jsonwebtoken": "^9.0.2",
        "@types/bcryptjs": "^2.4.2",
        "@types/cors": "^2.8.13",
        "@types/jest": "^29.5.2",
        "ts-node-dev": "^2.0.0",
        "eslint": "^8.42.0",
        "@typescript-eslint/eslint-plugin": "^5.59.8",
        "@typescript-eslint/parser": "^5.59.8",
        "jest": "^29.5.0",
        "ts-jest": "^29.1.0"
    }
}

with open(os.path.join(backend_dir, 'package.json'), 'w') as f:
    json.dump(backend_package, f, indent=2)

# Frontend package.json (from provided script)
frontend_package = {
    "name": "supermodel-ai-frontend",
    "version": "0.1.0",
    "private": True,
    "dependencies": {
        "@types/react-dom": "^18.2.5",
        "axios": "^1.4.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.12.1",
        "react-scripts": "5.0.1",
        "react-markdown": "^8.0.7",
        "react-syntax-highlighter": "^15.5.0",
        "socket.io-client": "^4.6.2",
        "tailwindcss": "^3.3.2",
        "typescript": "^5.1.3",
        "zustand": "^4.3.8"
    },
    "devDependencies": {
        "@testing-library/react": "^14.0.0",
        "@testing-library/user-event": "^14.4.3",
        "@types/jest": "^29.5.2",
        "@types/react-syntax-highlighter": "^15.5.7",
        "autoprefixer": "^10.4.14",
        "postcss": "^8.4.24"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": ["react-app", "react-app/jest"]
    },
    "browserslist": {
        "production": [">0.2%", "not dead", "not op_mini all"],
        "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
    }
}

with open(os.path.join(frontend_dir, 'package.json'), 'w') as f:
    json.dump(frontend_package, f, indent=2)

print("Package configuration files created successfully.")

# Backend .env
backend_env = """PORT=5000
NODE_ENV=development
POSTGRES_URI=postgresql://user:password@postgres:5432/supermodel_ai
MONGO_URI=mongodb://mongo:27017/supermodel_ai
JWT_SECRET=your_jwt_secret_here_change_me
OPENAI_API_KEY=your_openai_api_key_here
REDIS_URL=redis://redis:6379
ENCRYPTION_KEY=32_character_random_key_for_encryption
"""

with open(os.path.join(backend_dir, '.env'), 'w') as f:
    f.write(backend_env)

# Frontend .env
frontend_env = """REACT_APP_API_URL=http://localhost:5000/api
"""

with open(os.path.join(frontend_dir, '.env'), 'w') as f:
    f.write(frontend_env)

# Backend Dockerfile
backend_dockerfile = """FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
"""

with open(os.path.join(backend_dir, 'Dockerfile'), 'w') as f:
    f.write(backend_dockerfile)

# Frontend Dockerfile (from provided script)
frontend_dockerfile = """FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
"""

with open(os.path.join(frontend_dir, 'Dockerfile'), 'w') as f:
    f.write(frontend_dockerfile)

# Frontend Nginx config (from provided script)
nginx_config = """server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://backend:5000/socket.io;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
"""

with open(os.path.join(frontend_dir, 'nginx.conf'), 'w') as f:
    f.write(nginx_config)

# Docker Compose
docker_compose = """version: '3.8'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - POSTGRES_URI=postgresql://user:password@postgres:5432/supermodel_ai
      - MONGO_URI=mongodb://mongo:27017/supermodel_ai
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
    depends_on:
      - postgres
      - mongo
      - redis
    volumes:
      - ./backend:/usr/src/app
    networks:
      - supermodel-ai

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - supermodel-ai

  postgres:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=supermodel_ai
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - supermodel-ai

  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    networks:
      - supermodel-ai

  redis:
    image: redis:7
    volumes:
      - redis_data:/data
    networks:
      - supermodel-ai

volumes:
  postgres_data:
  mongo_data:
  redis_data:

networks:
  supermodel-ai:
    driver: bridge
"""

with open(os.path.join(project_dir, 'docker-compose.yml'), 'w') as f:
    f.write(docker_compose)

print("Environment and Docker configuration files created successfully.")

# Backend migration.sql
migration_sql = """-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skill Packs table
CREATE TABLE IF NOT EXISTS skill_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  creator_id UUID REFERENCES users(id),
  rating DECIMAL(3,1) DEFAULT 0.0,
  download_count INTEGER DEFAULT 0,
  version VARCHAR(20) DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skill Pack Reviews table
CREATE TABLE IF NOT EXISTS skill_pack_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_pack_id UUID REFERENCES skill_packs(id),
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  content TEXT NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session Skill Packs table
CREATE TABLE IF NOT EXISTS session_skill_packs (
  session_id UUID REFERENCES sessions(id),
  skill_pack_id UUID REFERENCES skill_packs(id),
  PRIMARY KEY (session_id, skill_pack_id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES users(id),
  data JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  result JSONB,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(20) NOT NULL,
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_skill_packs_creator_id ON skill_packs(creator_id);
CREATE INDEX idx_skill_pack_reviews_skill_pack_id ON skill_pack_reviews(skill_pack_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
"""

with open(os.path.join(backend_dir, 'scripts', 'migration.sql'), 'w') as f:
    f.write(migration_sql)

# Backend migrate.js (from provided script)
migrate_js = """// Database migration script for PostgreSQL
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runMigration() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
  });

  try {
    console.log('Running database migrations...');

    // Read migration SQL file
    const migrationSql = fs.readFileSync(
      path.join(__dirname, 'migration.sql'),
      'utf8'
    );

    // Execute migration
    await pool.query(migrationSql);

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
"""

with open(os.path.join(backend_dir, 'scripts', 'migrate.js'), 'w') as f:
    f.write(migrate_js)

# Backend seed.js
seed_js = """const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();

async function seed() {
  const pgPool = new Pool({ connectionString: process.env.POSTGRES_URI });
  await mongoose.connect(process.env.MONGO_URI);

  try {
    // Seed users
    await pgPool.query(`
      INSERT INTO users (id, username, email, password_hash, role)
      VALUES 
        ('550e8400-e29b-41d4-a716-446655440000', 'admin', 'admin@example.com', '$2a$10$examplehashedpassword', 'admin'),
        ('550e8400-e29b-41d4-a716-446655440001', 'user1', 'user1@example.com', '$2a$10$examplehashedpassword', 'user')
      ON CONFLICT DO NOTHING;
    `);

    // Seed skill packs
    await pgPool.query(`
      INSERT INTO skill_packs (id, name, description, price, creator_id, rating, download_count)
      VALUES 
        ('550e8400-e29b-41d4-a716-446655440002', 'Code Generator', 'Generates code in multiple languages', 9.99, '550e8400-e29b-41d4-a716-446655440000', 4.5, 100),
        ('550e8400-e29b-41d4-a716-446655440003', 'Text Analyzer', 'Analyzes text sentiment', 4.99, '550e8400-e29b-41d4-a716-446655440001', 4.0, 50)
      ON CONFLICT DO NOTHING;
    `);

    // Seed MongoDB skill pack content
    const skillPackContent = mongoose.connection.db.collection('skill_pack_content');
    await skillPackContent.insertMany([
      {
        skill_pack_id: '550e8400-e29b-41d4-a716-446655440002',
        content: { prompts: ['Generate Python code for...', 'Create a React component for...'] },
        content_hash: 'hash1',
        version: '1.0.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        skill_pack_id: '550e8400-e29b-41d4-a716-446655440003',
        content: { prompts: ['Analyze sentiment of...', 'Summarize text...'] },
        content_hash: 'hash2',
        version: '1.0.0',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await pgPool.end();
    await mongoose.connection.close();
  }
}

seed();
"""

with open(os.path.join(backend_dir, 'scripts', 'seed.js'), 'w') as f:
    f.write(seed_js)

# MongoDB init script
mongo_init_js = """db.createCollection('skill_pack_content', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['skill_pack_id', 'content', 'content_hash', 'created_at', 'updated_at'],
      properties: {
        skill_pack_id: { bsonType: 'string' },
        content: { bsonType: 'object' },
        content_hash: { bsonType: 'string' },
        version: { bsonType: 'string' },
        created_at: { bsonType: 'date' },
        updated_at: { bsonType: 'date' }
      }
    }
  }
});

db.createCollection('embeddings', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['skill_pack_id', 'embedding', 'content_hash', 'created_at', 'updated_at'],
      properties: {
        skill_pack_id: { bsonType: 'string' },
        embedding: { bsonType: 'array' },
        content_hash: { bsonType: 'string' },
        created_at: { bsonType: 'date' },
        updated_at: { bsonType: 'date' }
      }
    }
  }
});

db.skill_pack_content.createIndex({ skill_pack_id: 1 }, { unique: true });
db.embeddings.createIndex({ skill_pack_id: 1 }, { unique: true });
"""

with open(os.path.join(backend_dir, 'scripts', 'mongo-init.js'), 'w') as f:
    f.write(mongo_init_js)

print("Database migration and seed scripts created successfully.")

# Backend index.ts
index_ts = """import express from 'express';
import mongoose from 'mongoose';
import { Pool } from 'pg';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger';
import { setupRoutes } from './routes';
import { setupMiddleware } from './middleware';
import { setupJobs } from './jobs/processor';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Database connections
const pgPool = new Pool({ connectionString: process.env.POSTGRES_URI });

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10
}).then(() => {
  logger.info('MongoDB connected');
}).catch(err => {
  logger.error('MongoDB connection error:', err);
  process.exit(1);
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000' }));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests
}));

// Setup routes and middleware
setupRoutes(app);
setupMiddleware(app);

// WebSocket setup
io.on('connection', (socket) => {
  logger.info('WebSocket client connected');
  
  socket.on('join-session', (sessionId: string) => {
    socket.join(sessionId);
    logger.info(`Client joined session ${sessionId}`);
  });

  socket.on('disconnect', () => {
    logger.info('WebSocket client disconnected');
  });
});

// Setup background jobs
setupJobs(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  await pgPool.end();
  await mongoose.connection.close();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});
"""

with open(os.path.join(backend_dir, 'src', 'index.ts'), 'w') as f:
    f.write(index_ts)

# Backend tsconfig.json
tsconfig_backend = {
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": True,
        "esModuleInterop": True,
        "skipLibCheck": True,
        "forceConsistentCasingInFileNames": True,
        "moduleResolution": "node"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}

with open(os.path.join(backend_dir, 'tsconfig.json'), 'w') as f:
    json.dump(tsconfig_backend, f, indent=2)

# Backend routes/index.ts (from provided script)
routes_index_ts = """import { Express } from 'express';
import authRoutes from './auth';
import taskRoutes from './tasks';
import skillPackRoutes from './skillPacks';
import marketplaceRoutes from './marketplace';
import sessionRoutes from './sessions';
import userRoutes from './users';
import { authMiddleware } from '../middleware/auth';

export function setupRoutes(app: Express) {
  // Public routes
  app.use('/api/auth', authRoutes);

  // Protected routes
  app.use('/api/tasks', authMiddleware, taskRoutes);
  app.use('/api/skill-packs', authMiddleware, skillPackRoutes);
  app.use('/api/marketplace', authMiddleware, marketplaceRoutes);
  app.use('/api/sessions', authMiddleware, sessionRoutes);
  app.use('/api/users', authMiddleware, userRoutes);

  // Health check route
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'index.ts'), 'w') as f:
    f.write(routes_index_ts)

# Backend middleware/index.ts (from provided script)
middleware_index_ts = """import { Express, Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function setupMiddleware(app: Express) {
  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' ? undefined : err.message,
    });
  });
}
"""

with open(os.path.join(backend_dir, 'src', 'middleware', 'index.ts'), 'w') as f:
    f.write(middleware_index_ts)

# Backend middleware/auth.ts
auth_middleware_ts = """import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string; email: string; role: string };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
"""

with open(os.path.join(backend_dir, 'src', 'middleware', 'auth.ts'), 'w') as f:
    f.write(auth_middleware_ts)

# Backend middleware/validator.ts
validator_middleware_ts = """import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { logger } from '../utils/logger';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    
    next();
  };
};
"""

with open(os.path.join(backend_dir, 'src', 'middleware', 'validator.ts'), 'w') as f:
    f.write(validator_middleware_ts)

# Backend types/index.ts (from provided script)
types_ts = """import { Types } from 'mongoose';

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface SkillPack {
  id: string;
  name: string;
  description?: string;
  price: number;
  creator_id: string;
  rating: number;
  download_count: number;
  version: string;
  created_at: Date;
  updated_at: Date;
}

export interface SkillPackContent {
  skill_pack_id: string;
  content: any;
  content_hash: string;
  version: string;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: string;
  user_id: string;
  title?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: string;
  session_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: Date;
}

export interface SkillPackReview {
  id: string;
  skill_pack_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    pages?: number;
  };
}

export interface Task {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data: any;
  user_id?: string;
  progress: number;
  result?: any;
  error?: string;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'purchase' | 'refund' | 'bonus' | 'usage';
  description?: string;
  reference_id?: string;
  created_at: Date;
}

export interface AIRequest {
  session_id: string;
  message: string;
  skill_pack_ids?: string[];
}

export interface AIResponse {
  message: Message;
  tokens_used: number;
  skill_packs_used: string[];
}
"""

with open(os.path.join(backend_dir, 'src', 'types', 'index.ts'), 'w') as f:
    f.write(types_ts)

print("Backend middleware and type definition files created successfully.")

# Backend models/SkillPack.ts (from provided script)
skill_pack_model_ts = """import { Pool } from 'pg';
import { SkillPack, SkillPackReview } from '../types';
import { getPgPool } from '../config/db';

export async function createSkillPack(skillPack: Omit<SkillPack, 'id' | 'created_at' | 'updated_at'>): Promise<SkillPack> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `INSERT INTO skill_packs (name, description, price, creator_id, rating, download_count, version)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      skillPack.name,
      skillPack.description || null,
      skillPack.price,
      skillPack.creator_id,
      skillPack.rating || 0.0,
      skillPack.download_count || 0,
      skillPack.version || '1.0.0'
    ]
  );
  
  return result.rows[0];
}

export async function getSkillPackById(id: string): Promise<SkillPack | null> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `SELECT * FROM skill_packs WHERE id = $1`,
    [id]
  );
  
  return result.rows[0] || null;
}

export async function getSkillPacks(page: number = 1, limit: number = 20): Promise<{ skillPacks: SkillPack[], total: number }> {
  const pool = getPgPool();
  const offset = (page - 1) * limit;
  
  const result = await pool.query(
    `SELECT * FROM skill_packs
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  
  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM skill_packs`
  );
  
  return {
    skillPacks: result.rows,
    total: parseInt(countResult.rows[0].total, 10)
  };
}

export async function createSkillPackReview(review: Omit<SkillPackReview, 'id' | 'created_at'>): Promise<SkillPackReview> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `INSERT INTO skill_pack_reviews (skill_pack_id, user_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (skill_pack_id, user_id)
     DO UPDATE SET rating = $3, comment = $4, created_at = NOW()
     RETURNING *`,
    [
      review.skill_pack_id,
      review.user_id,
      review.rating,
      review.comment || null
    ]
  );
  
  await pool.query(
    `UPDATE skill_packs
     SET rating = (
       SELECT AVG(rating)
       FROM skill_pack_reviews
       WHERE skill_pack_id = $1
     )
     WHERE id = $1`,
    [review.skill_pack_id]
  );
  
  return result.rows[0];
}

export async function getReviewsForSkillPack(
  skillPackId: string,
  page: number = 1,
  limit: number = 20
): Promise<{ reviews: SkillPackReview[], total: number }> {
  const pool = getPgPool();
  const offset = (page - 1) * limit;
  
  const result = await pool.query(
    `SELECT spr.id, spr.skill_pack_id, spr.user_id, spr.rating,
            spr.comment, spr.created_at, u.username
     FROM skill_pack_reviews spr
     JOIN users u ON spr.user_id = u.id
     WHERE spr.skill_pack_id = $1
     ORDER BY spr.created_at DESC
     LIMIT $2 OFFSET $3`,
    [skillPackId, limit, offset]
  );
  
  const countResult = await pool.query(
    `SELECT COUNT(*) as total
     FROM skill_pack_reviews
     WHERE skill_pack_id = $1`,
    [skillPackId]
  );
  
  return {
    reviews: result.rows,
    total: parseInt(countResult.rows[0].total, 10)
  };
}
"""

with open(os.path.join(backend_dir, 'src', 'models', 'SkillPack.ts'), 'w') as f:
    f.write(skill_pack_model_ts)

# Backend models/User.ts
user_model_ts = """import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { User } from '../types';
import { getPgPool } from '../config/db';

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const pool = getPgPool();
  const passwordHash = await bcrypt.hash(user.password_hash, 10);
  
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user.username, user.email, passwordHash, user.role || 'user']
  );
  
  return result.rows[0];
}

export async function getUserById(id: string): Promise<User | null> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  
  return result.rows[0] || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  
  return result.rows[0] || null;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password_hash);
  return isValid ? user : null;
}
"""

with open(os.path.join(backend_dir, 'src', 'models', 'User.ts'), 'w') as f:
    f.write(user_model_ts)

print("Backend model files created successfully.")

# Backend controllers/sessions.ts (partial from provided script, completed)
session_controller_ts = """import { Request, Response } from 'express';
import { body } from 'express-validator';
import { logger } from '../utils/logger';
import { createSession, getSessions, getSessionById, updateSession, deleteSession, getSessionMessages, createMessage, addSkillPackToSession, getSessionSkillPacks } from '../models/Session';
import { AuthenticatedRequest } from '../middleware/auth';

export const createSessionValidation = [
  body('title').optional().isString().trim().isLength({ max: 100 })
];

export const createMessageValidation = [
  body('content').isString().trim().notEmpty(),
  body('role').isIn(['user', 'assistant'])
];

export async function createSession(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await createSession({
      user_id: req.user.id,
      title: req.body.title
    });
    
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    logger.error('Create session failed:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
}

export async function getSessions(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    
    const { sessions, total } = await getSessions(req.user.id, page, limit);
    
    res.json({
      success: true,
      data: sessions,
      meta: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    logger.error('Get sessions failed:', error);
    res.status(500).json({ error: 'Failed to get sessions' });
  }
}

export async function getSessionById(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json({ success: true, data: session });
  } catch (error) {
    logger.error('Get session failed:', error);
    res.status(500).json({ error: 'Failed to get session' });
  }
}

export async function updateSession(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    const updatedSession = await updateSession(req.params.id, { title: req.body.title });
    res.json({ success: true, data: updatedSession });
  } catch (error) {
    logger.error('Update session failed:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
}

export async function deleteSession(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    await deleteSession(req.params.id);
    res.json({ success: true });
  } catch (error) {
    logger.error('Delete session failed:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
}

export async function getSessionMessages(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    
    const { messages, total } = await getSessionMessages(req.params.id, page, limit);
    
    res.json({
      success: true,
      data: messages,
      meta: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    logger.error('Get session messages failed:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
}

export async function createMessage(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    const message = await createMessage({
      session_id: req.params.id,
      content: req.body.content,
      role: req.body.role
    });
    
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    logger.error('Create message failed:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
}

export async function addSkillPackToSession(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    await addSkillPackToSession(req.params.id, req.params.skillPackId);
    res.json({ success: true });
  } catch (error) {
    logger.error('Add skill pack to session failed:', error);
    res.status(500).json({ error: 'Failed to add skill pack' });
  }
}

export async function getSessionSkillPacks(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const session = await getSessionById(req.params.id);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    const skillPacks = await getSessionSkillPacks(req.params.id);
    res.json({ success: true, data: skillPacks });
  } catch (error) {
    logger.error('Get session skill packs failed:', error);
    res.status(500).json({ error: 'Failed to get skill packs' });
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'controllers', 'sessions.ts'), 'w') as f:
    f.write(session_controller_ts)

# Backend routes/sessions.ts (from provided script)
session_routes_ts = """import { Router } from 'express';
import { validate } from '../middleware/validator';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  getSessionMessages,
  createMessage,
  addSkillPackToSession,
  getSessionSkillPacks,
  createSessionValidation,
  createMessageValidation,
} from '../controllers/sessions';

const router = Router();

// GET /api/sessions
router.get('/', getSessions);

// POST /api/sessions
router.post('/', validate(createSessionValidation), createSession);

// GET /api/sessions/:id
router.get('/:id', getSessionById);

// PUT /api/sessions/:id
router.put('/:id', updateSession);

// DELETE /api/sessions/:id
router.delete('/:id', deleteSession);

// GET /api/sessions/:id/messages
router.get('/:id/messages', getSessionMessages);

// POST /api/sessions/:id/messages
router.post('/:id/messages', validate(createMessageValidation), createMessage);

// POST /api/sessions/:id/skill-packs/:skillPackId
router.post('/:id/skill-packs/:skillPackId', addSkillPackToSession);

// GET /api/sessions/:id/skill-packs
router.get('/:id/skill-packs', getSessionSkillPacks);

export default router;
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'sessions.ts'), 'w') as f:
    f.write(session_routes_ts)

# Backend models/Session.ts
session_model_ts = """import { Pool } from 'pg';
import { Session, Message } from '../types';
import { getPgPool } from '../config/db';

export async function createSession(session: Omit<Session, 'id' | 'created_at' | 'updated_at'>): Promise<Session> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `INSERT INTO sessions (user_id, title)
     VALUES ($1, $2)
     RETURNING *`,
    [session.user_id, session.title || null]
  );
  
  return result.rows[0];
}

export async function getSessions(userId: string, page: number = 1, limit: number = 20): Promise<{ sessions: Session[], total: number }> {
  const pool = getPgPool();
  const offset = (page - 1) * limit;
  
  const result = await pool.query(
    `SELECT * FROM sessions
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  
  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM sessions WHERE user_id = $1`,
    [userId]
  );
  
  return {
    sessions: result.rows,
    total: parseInt(countResult.rows[0].total, 10)
  };
}

export async function getSessionById(id: string): Promise<Session | null> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `SELECT * FROM sessions WHERE id = $1`,
    [id]
  );
  
  return result.rows[0] || null;
}

export async function updateSession(id: string, updates: Partial<Session>): Promise<Session> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `UPDATE sessions
     SET title = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [updates.title || null, id]
  );
  
  return result.rows[0];
}

export async function deleteSession(id: string): Promise<void> {
  const pool = getPgPool();
  
  await pool.query(
    `DELETE FROM sessions WHERE id = $1`,
    [id]
  );
}

export async function getSessionMessages(sessionId: string, page: number = 1, limit: number = 20): Promise<{ messages: Message[], total: number }> {
  const pool = getPgPool();
  const offset = (page - 1) * limit;
  
  const result = await pool.query(
    `SELECT * FROM messages
     WHERE session_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [sessionId, limit, offset]
  );
  
  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM messages WHERE session_id = $1`,
    [sessionId]
  );
  
  return {
    messages: result.rows,
    total: parseInt(countResult.rows[0].total, 10)
  };
}

export async function createMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `INSERT INTO messages (session_id, content, role)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [message.session_id, message.content, message.role]
  );
  
  return result.rows[0];
}

export async function addSkillPackToSession(sessionId: string, skillPackId: string): Promise<void> {
  const pool = getPgPool();
  
  await pool.query(
    `INSERT INTO session_skill_packs (session_id, skill_pack_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [sessionId, skillPackId]
  );
}

export async function getSessionSkillPacks(sessionId: string): Promise<SkillPack[]> {
  const pool = getPgPool();
  
  const result = await pool.query(
    `SELECT sp.* FROM skill_packs sp
     JOIN session_skill_packs ssp ON sp.id = ssp.skill_pack_id
     WHERE ssp.session_id = $1`,
    [sessionId]
  );
  
  return result.rows;
}
"""

with open(os.path.join(backend_dir, 'src', 'models', 'Session.ts'), 'w') as f:
    f.write(session_model_ts)

print("Backend controller and route files created successfully.")

# Backend services/skillPackContent.ts (from provided script)
skill_pack_content_service_ts = """import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { SkillPackContent } from '../types';
import crypto from 'crypto';

export async function createSkillPackContent(skillPackId: string, content: any): Promise<{ skill_pack_id: string, content_hash: string }> {
  try {
    const collection = mongoose.connection.db.collection('skill_pack_content');
    const contentHash = crypto.createHash('sha256').update(JSON.stringify(content)).digest('hex');
    const now = new Date();
    
    await collection.updateOne(
      { skill_pack_id: skillPackId },
      {
        $set: {
          skill_pack_id: skillPackId,
          content,
          version: '1.0.0',
          content_hash: contentHash,
          updated_at: now
        },
        $setOnInsert: {
          created_at: now
        }
      },
      { upsert: true }
    );
    
    return {
      skill_pack_id: skillPackId,
      content_hash: contentHash
    };
  } catch (error) {
    logger.error('Error creating skill pack content:', error);
    throw error;
  }
}

export async function getMultipleSkillPackContents(skillPackIds: string[]): Promise<SkillPackContent[]> {
  try {
    const collection = mongoose.connection.db.collection('skill_pack_content');
    
    const contents = await collection
      .find({ skill_pack_id: { $in: skillPackIds } })
      .toArray();
    
    return contents as unknown as SkillPackContent[];
  } catch (error) {
    logger.error('Error getting multiple skill pack contents:', error);
    throw error;
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'services', 'skillPackContent.ts'), 'w') as f:
    f.write(skill_pack_content_service_ts)

# Backend services/ai.ts
ai_service_ts = """import { OpenAI } from 'openai';
import { logger } from '../utils/logger';
import { AIRequest, AIResponse, Message } from '../types';
import { getMultipleSkillPackContents } from './skillPackContent';
import { createMessage } from '../models/Session';
import { createTask } from '../jobs/processor';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function processAIRequest(request: AIRequest): Promise<AIResponse> {
  try {
    let context = request.message;
    
    if (request.skill_pack_ids && request.skill_pack_ids.length > 0) {
      const skillPackContents = await getMultipleSkillPackContents(request.skill_pack_ids);
      context += '\\n\\nSkill Pack Context:\\n' + skillPackContents.map(content => JSON.stringify(content.content)).join('\\n');
    }
    
    const task = await createTask({
      name: 'ai_processing',
      user_id: request.user_id,
      data: { request, context }
    });
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: context }],
      max_tokens: 1000
    });
    
    const message: Message = {
      id: '',
      session_id: request.session_id,
      content: completion.choices[0].message.content || '',
      role: 'assistant',
      created_at: new Date()
    };
    
    const savedMessage = await createMessage(message);
    
    return {
      message: savedMessage,
      tokens_used: completion.usage?.total_tokens || 0,
      skill_packs_used: request.skill_pack_ids || []
    };
  } catch (error) {
    logger.error('AI processing error:', error);
    throw error;
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'services', 'ai.ts'), 'w') as f:
    f.write(ai_service_ts)

# Backend jobs/processor.ts (from provided script, completed)
job_processor_ts = """import { Pool } from 'pg';
import { Queue, Worker } from 'bull';
import { Server } from 'socket.io';
import { logger } from '../utils/logger';
import { getPgPool } from '../config/db';
import mongoose from 'mongoose';

const taskQueue = new Queue('tasks', process.env.REDIS_URL);

export function setupJobs(io: Server) {
  new Worker('tasks', async (job) => {
    try {
      const { name, user_id, data } = job.data;
      
      await updateTaskStatus(job.id.toString(), 'processing', 50);
      
      // Simulate task processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update task status
      await updateTaskStatus(job.id.toString(), 'completed', 100, { result: 'Task completed' });
      
      // Emit WebSocket update
      if (user_id) {
        io.to(user_id).emit('task-update', {
          taskId: job.id,
          status: 'completed',
          progress: 100
        });
      }
    } catch (error) {
      logger.error('Task processing error:', error);
      await updateTaskStatus(job.id.toString(), 'failed', 0, undefined, (error as Error).message);
      
      if (job.data.user_id) {
        io.to(job.data.user_id).emit('task-update', {
          taskId: job.id,
          status: 'failed',
          error: (error as Error).message
        });
      }
    }
  }, { connection: { host: 'redis', port: 6379 } });
}

async function updateTaskStatus(taskId: string, status: string, progress: number, result?: any, error?: string): Promise<void> {
  const pool = getPgPool();
  
  await pool.query(
    `UPDATE tasks
     SET status = $1, progress = $2, result = $3, error = $4, updated_at = NOW(),
         completed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE completed_at END
     WHERE id = $5`,
    [status, progress, result || null, error || null, taskId]
  );
}

export async function createTask(taskData: {
  name: string;
  user_id?: string;
  data?: any;
}): Promise<any> {
  const pool = getPgPool();
  
  const result = await pool.query(`
    INSERT INTO tasks (name, user_id, data, status, progress)
    VALUES ($1, $2, $3, 'pending', 0)
    RETURNING *
  `, [taskData.name, taskData.user_id || null, taskData.data || {}]);
  
  await taskQueue.add(taskData);
  
  return result.rows[0];
}

export async function getTaskStatus(taskId: string): Promise<any> {
  const pool = getPgPool();
  
  const result = await pool.query(`
    SELECT * FROM tasks WHERE id = $1
  `, [taskId]);
  
  return result.rows[0] || null;
}
"""

with open(os.path.join(backend_dir, 'src', 'jobs', 'processor.ts'), 'w') as f:
    f.write(job_processor_ts)

# Backend controllers/tasks.ts (from provided script)
tasks_controller_ts = """import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { createTask, getTaskStatus } from '../jobs/processor';
import { AuthenticatedRequest } from '../middleware/auth';

export async function createTaskHandler(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const task = await createTask({
      name: req.body.name,
      user_id: req.user.id,
      data: req.body.data
    });
    
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    logger.error('Create task failed:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getTaskStatusHandler(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const { id } = req.params;
    
    const task = await getTaskStatus(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.user_id && task.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to access this task' });
    }
    
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    logger.error('Get task status failed:', error);
    res.status(500).json({ error: 'Failed to get task status' });
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'controllers', 'tasks.ts'), 'w') as f:
    f.write(tasks_controller_ts)

# Backend routes/tasks.ts (from provided script)
tasks_routes_ts = """import { Router } from 'express';
import {
  createTaskHandler,
  getTaskStatusHandler,
} from '../controllers/tasks';

const router = Router();

// POST /api/tasks
router.post('/', createTaskHandler);

// GET /api/tasks/:id
router.get('/:id', getTaskStatusHandler);

export default router;
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'tasks.ts'), 'w') as f:
    f.write(tasks_routes_ts)

# Backend controllers/auth.ts
auth_controller_ts = """import { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
import { createUser, verifyUser } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';

export const registerValidation = [
  body('username').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

export async function register(req: Request, res: Response) {
  try {
    const user = await createUser({
      username: req.body.username,
      email: req.body.email,
      password_hash: req.body.password
    });
    
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    logger.error('Registration failed:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await verifyUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    
    res.json({ success: true, data: { user, token } });
  } catch (error) {
    logger.error('Login failed:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

export async function getCurrentUser(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    res.json({ success: true, data: req.user });
  } catch (error) {
    logger.error('Get current user failed:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'controllers', 'auth.ts'), 'w') as f:
    f.write(auth_controller_ts)

# Backend routes/auth.ts
auth_routes_ts = """import { Router } from 'express';
import { validate } from '../middleware/validator';
import { register, login, getCurrentUser, registerValidation, loginValidation } from '../controllers/auth';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'auth.ts'), 'w') as f:
    f.write(auth_routes_ts)

# Backend controllers/marketplace.ts
marketplace_controller_ts = """import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { createSkillPack, getSkillPacks, getSkillPackById, createSkillPackReview } from '../models/SkillPack';
import { AuthenticatedRequest } from '../middleware/auth';
import { body } from 'express-validator';

export const reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().isString().trim()
];

export async function getMarketplaceSkillPacks(req: AuthenticatedRequest, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    
    const { skillPacks, total } = await getSkillPacks(page, limit);
    
    res.json({
      success: true,
      data: skillPacks,
      meta: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    logger.error('Get marketplace skill packs failed:', error);
    res.status(500).json({ error: 'Failed to get skill packs' });
  }
}

export async function purchaseSkillPack(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const skillPack = await getSkillPackById(req.params.id);
    if (!skillPack) {
      return res.status(404).json({ error: 'Skill pack not found' });
    }
    
    // TODO: Implement payment processing
    // For now, simulate purchase by incrementing download_count
    await createTask({
      name: 'purchase_skill_pack',
      user_id: req.user.id,
      data: { skillPackId: req.params.id }
    });
    
    res.json({ success: true });
  } catch (error) {
    logger.error('Purchase skill pack failed:', error);
    res.status(500).json({ error: 'Failed to purchase skill pack' });
  }
}

export async function reviewSkillPack(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const review = await createSkillPackReview({
      skill_pack_id: req.params.id,
      user_id: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    });
    
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    logger.error('Review skill pack failed:', error);
    res.status(500).json({ error: 'Failed to review skill pack' });
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'controllers', 'marketplace.ts'), 'w') as f:
    f.write(marketplace_controller_ts)

# Backend routes/marketplace.ts
marketplace_routes_ts = """import { Router } from 'express';
import { getMarketplaceSkillPacks, purchaseSkillPack, reviewSkillPack, reviewValidation } from '../controllers/marketplace';
import { validate } from '../middleware/validator';

const router = Router();

router.get('/', getMarketplaceSkillPacks);
router.post('/:id/purchase', purchaseSkillPack);
router.post('/:id/reviews', validate(reviewValidation), reviewSkillPack);

export default router;
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'marketplace.ts'), 'w') as f:
    f.write(marketplace_routes_ts)

print("Backend skill pack files created successfully.")

# Backend utils/logger.ts
logger_ts = """import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
"""

with open(os.path.join(backend_dir, 'src', 'utils', 'logger.ts'), 'w') as f:
    f.write(logger_ts)

# Backend config/db.ts
db_config_ts = """import { Pool } from 'pg';

let pgPool: Pool;

export function getPgPool(): Pool {
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: process.env.POSTGRES_URI,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }
  return pgPool;
}
"""

with open(os.path.join(backend_dir, 'src', 'config', 'db.ts'), 'w') as f:
    f.write(db_config_ts)

print("Backend AI service and background job files created successfully.")

# Backend controllers/users.ts
users_controller_ts = """import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { getUserById } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';

export async function getUserProfile(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Get user profile failed:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'controllers', 'users.ts'), 'w') as f:
    f.write(users_controller_ts)

# Backend routes/users.ts
users_routes_ts = """import { Router } from 'express';
import { getUserProfile } from '../controllers/users';

const router = Router();

router.get('/profile', getUserProfile);

export default router;
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'users.ts'), 'w') as f:
    f.write(users_routes_ts)

# Backend controllers/skillPacks.ts
skill_packs_controller_ts = """import { Request, Response } from 'express';
import { body } from 'express-validator';
import { logger } from '../utils/logger';
import { createSkillPack, getSkillPackById } from '../models/SkillPack';
import { createSkillPackContent } from '../services/skillPackContent';
import { AuthenticatedRequest } from '../middleware/auth';

export const createSkillPackValidation = [
  body('name').isString().trim().notEmpty(),
  body('description').optional().isString().trim(),
  body('price').isFloat({ min: 0 }),
  body('content').isObject()
];

export async function createSkillPackHandler(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const skillPack = await createSkillPack({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      creator_id: req.user.id
    });
    
    await createSkillPackContent(skillPack.id, req.body.content);
    
    res.status(201).json({ success: true, data: skillPack });
  } catch (error) {
    logger.error('Create skill pack failed:', error);
    res.status(500).json({ error: 'Failed to create skill pack' });
  }
}

export async function getSkillPackHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const skillPack = await getSkillPackById(req.params.id);
    if (!skillPack) {
      return res.status(404).json({ error: 'Skill pack not found' });
    }
    
    res.json({ success: true, data: skillPack });
  } catch (error) {
    logger.error('Get skill pack failed:', error);
    res.status(500).json({ error: 'Failed to get skill pack' });
  }
}
"""

with open(os.path.join(backend_dir, 'src', 'controllers', 'skillPacks.ts'), 'w') as f:
    f.write(skill_packs_controller_ts)

# Backend routes/skillPacks.ts
skill_packs_routes_ts = """import { Router } from 'express';
import { validate } from '../middleware/validator';
import { createSkillPackHandler, getSkillPackHandler, createSkillPackValidation } from '../controllers/skillPacks';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', validate(createSkillPackValidation), createSkillPackHandler);
router.get('/:id', authMiddleware, getSkillPackHandler);

export default router;
"""

with open(os.path.join(backend_dir, 'src', 'routes', 'skillPacks.ts'), 'w') as f:
    f.write(skill_packs_routes_ts)

print("Backend user, marketplace, and task files created successfully.")

# Backend API documentation
api_docs_yaml = """openapi: 3.0.3
info:
  title: SuperModel AI API
  version: 1.0.0
  description: API for SuperModel AI platform
servers:
  - url: http://localhost:5000/api
paths:
  /auth/register:
    post:
      summary: Register a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username: { type: string }
                email: { type: string }
                password: { type: string }
      responses:
        '201': { description: User created }
        '400': { description: Invalid input }
  /auth/login:
    post:
      summary: Login user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email: { type: string }
                password: { type: string }
      responses:
        '200': { description: JWT token }
        '401': { description: Unauthorized }
  /skill-packs:
    post:
      summary: Create a new skill pack
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name: { type: string }
                description: { type: string }
                price: { type: number }
                content: { type: object }
      responses:
        '201': { description: Skill pack created }
        '400': { description: Invalid input }
  /marketplace:
    get:
      summary: Get skill packs
      security:
        - bearerAuth: []
      responses:
        '200':
          description: List of skill packs
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SkillPack'
components:
  schemas:
    SkillPack:
      type: object
      properties:
        id: { type: string }
        name: { type: string }
        description: { type: string }
        price: { type: number }
        rating: { type: number }
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
"""

with open(os.path.join(backend_dir, 'api-docs.yaml'), 'w') as f:
    f.write(api_docs_yaml)

# Backend deploy.sh
deploy_sh = """#!/bin/bash
set -e

echo "Building and deploying SuperModel AI..."

# Pull latest changes
git pull origin main

# Build and start containers
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

# Run migrations
docker-compose exec backend npm run migrate
docker-compose exec backend node scripts/mongo-init.js

# Run seed (optional, for testing)
# docker-compose exec backend npm run seed

echo "Deployment completed successfully!"
"""

with open(os.path.join(backend_dir, 'deploy.sh'), 'w
