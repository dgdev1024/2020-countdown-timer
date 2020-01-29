/**
 * @file app.jsx
 */

// Imports
import React from 'react';

// Context Imports
import EventsProvider from './contexts/events';

// Component Imports
import EventEditor from './components/event-editor';
import EventView from './components/event-view';

import './app.scss';

// Inner App
const InnerApp = () => (
  <main>
    <h1>Countdown Timer</h1>
    <EventEditor />
    <EventView />
    <footer>
      Coded by <a href="https://dgdev1024.glitch.me" target="_blank">Dennis Griffin</a>
    </footer>
  </main>
);

// Outer App
const App = () => (
  <EventsProvider>
    <InnerApp />
  </EventsProvider>
);

// Exports
export default App;
