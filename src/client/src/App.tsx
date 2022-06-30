// routing and backend connection
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// pages
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/notFound';
import ChecklistPage from './pages/Checklist';

// components
import Homebar from './components/Homebar';
import Checklist from './components/Checklist';

// authorization
import auth from './util/auth';
import { useState } from 'react';

// apollo client initialization
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// main app
function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Homebar />
        {auth.loggedIn() ? (
          <div className="container">
            <div className="row mt-3">
              <div className="col-9">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/checklist" element={<ChecklistPage />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </div>
              <div className="col-3">
                <Checklist
                  name="Todos"
                  checklistItems={todos}
                  displayList={false}
                />
                <Checklist
                  name="Missed Todos:"
                  checklistItems={todos}
                  displayList={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </ApolloProvider>
  );
}

export default App;
