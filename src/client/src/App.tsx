// routing and backend connection
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Homepage from './pages/Homepage';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/notFound';

// components
import Homebar from './components/Homebar';

// apollo client initialization
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

// main app
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Homebar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
