import React from 'react';

const ProjectList = ({ projects, loading, error }) => {
  if (loading) return <div className="text-center p-4">Loading projects...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Projects ({projects.length})
      </h2>
      
      {projects.length === 0 ? (
        <div className="text-center text-gray-500 p-8">
          No projects found
        </div>
      ) : (
        projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                >
                  View Code
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 text-sm"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;