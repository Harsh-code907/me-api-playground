import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './components/Profile';
import Skills from './components/Skills';  
import Search from './components/Search';
import ProjectList from './components/ProjectList';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects`);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchProjects = async (query) => {
    try {
      setLoading(true);
      setIsSearching(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects/search?q=${encodeURIComponent(query)}`
      );
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search projects');
      console.error('Error searching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Profile />
        
         {/* This will show skills on webpage */}
        <Skills />  
        
         {/* This will show search bar for projects */}
        <div className="mb-8">
          <Search onSearch={searchProjects} onClear={clearSearch} />
          {isSearching && (
            <div className="text-sm text-gray-600 mb-4">
              Showing search results
            </div>
          )}
        </div>
        
         {/* This will show my project list */}
        <ProjectList projects={projects} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;