import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`);
      setProfile(response.data);
    } catch (err) {
      setError('Failed to fetch profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading profile...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!profile) return <div className="text-center p-4">No profile found</div>;

  // Safe fallbacks for undefined values
  const name = profile.name || "Default User";
  const email = profile.email || "No email";
  const education = profile.education || "No education info";
  const work = profile.work || "No work info";
  const links = profile.links || {};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Education</h3>
          <p className="text-gray-600">{education}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Work</h3>
          <p className="text-gray-600">{work}</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Links</h3>
        <div className="flex flex-wrap gap-2">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
              GitHub
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
               className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500">
              LinkedIn
            </a>
          )}
          {links.portfolio && (
            <a href={links.portfolio} target="_blank" rel="noopener noreferrer"
               className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500">
              Portfolio
            </a>
          )}
          {!links.github && !links.linkedin && !links.portfolio && (
            <span className="text-gray-500 text-sm">No links available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;