import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitProject } from '../utils/api';

export default function PostProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    budgetType: 'fixed',
    minBudget: '',
    maxBudget: '',
    deadline: '',
    files: null
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const skillsArray = formData.skills.split(',').map(s => s.trim());
      const projectData = { 
        ...formData, 
        requiredSkills: skillsArray,
        clientId: user ? user.id : null 
      };
      await submitProject(projectData);
      alert('Project posted successfully!');
      navigate('/projects');
    } catch (err) {
      alert('Failed to post project: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };
  
 
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files : value
    }));
  };
  
  
  return (
    <div className="page post-project-page">
      <div className="container">
        <h1>Post a Project</h1>
        
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Build a responsive e-commerce website"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project in detail..."
              rows="6"
              required
            />
          </div>
          
        
          
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="design">Design</option>
                <option value="writing">Writing</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Required Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB"
                required
              />
            </div>
          </div>
          
        
          
          <div className="form-group">
            <label>Budget ($)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget || formData.minBudget || ''}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  budget: val,
                  minBudget: val,
                  maxBudget: val
                }));
              }}
              placeholder="Enter budget amount"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Project Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Attach Files (Optional)</label>
            <input
              type="file"
              name="files"
              onChange={handleChange}
              multiple
            />
          </div>
          
          <button type="submit" className="btn-primary">Post Project</button>
        </form>
      </div>
    </div>
  );
}
//demo

//





