import express from "express";
import { initializeDatabase } from "./data-source";
import AppRouter from "./routes";
import morgan from "morgan";
import cors from "cors";
import { globalErrorHandler } from "./utils/helpers/global-error-handler";
import cookieParser from "cookie-parser";

export const startServer = async () => {
  
  // connect to the database
  await initializeDatabase();
  
  const app: express.Application = express(); 

  // set up application middleware
  app.use(express.json());
  app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
  app.use(cookieParser());
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // set up the application router for the API
  app.use('/api/v1/', AppRouter);
  app.use(globalErrorHandler);

  // Start listening 
  const host: string = process.env.HOST || 'localhost'
  const port: number = parseInt(process.env.PORT || '3000');

  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port} in ${process.env.NODE_ENV} mode...`);
  });

}