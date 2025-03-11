import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors'; // Importowanie middleware CORS

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware CORS - dodane, aby rozwiązać problem CORS
app.use(
  cors({
    origin: 'http://localhost:4200', // Zezwalaj tylko na połączenia z localhost:4200
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Dozwolone metody HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Dozwolone nagłówki
    credentials: true, // Zezwalaj na uwierzytelnione żądania (np. cookies lub tokeny)
  }),
);

// Ręczna obsługa preflight request w przypadku, gdy middleware CORS nie działa dla metod OPTIONS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.status(204).send();
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Example API endpoints (jeśli masz potrzebę dodania REST API)
 */
app.post('/api/login', (req, res) => {
  // Obsługa logowania tutaj
  res.json({ token: 'example-jwt-token' });
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
