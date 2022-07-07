// routing and backend connection
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

// specifying where to find graphql
const httpLink = createHttpLink({
  uri: '/graphql',
});

// setting context for authorization
const authLink = setContext((_, { headers }) => {
  // the appropriate jsx token
  const token = auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// apollo client initialization
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// main app
function App() {
  const [todos] = useState([]);

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
                {/* TODO: make todolist a global member of user */}
                <Checklist name="Todos" checklistItems={todos} id="todos" />
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
