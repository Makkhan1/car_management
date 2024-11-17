import React, { useState } from 'react';
import { createCar, updateCar } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import './CarForm.css'; 

function CarForm({ isEdit = false }) {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); 
  const [tags, setTags] = useState([]); 
  const [tagInput, setTagInput] = useState(''); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    images.forEach((image) => {
      formData.append('images', image); 
    });

    tags.forEach((tag) => {
      formData.append('tags', tag); 
    });

    try {
      if (isEdit) {
        await updateCar(id, formData); 
      } else {
        await createCar(formData); 
      }
      navigate('/cars');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="form-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="form-textarea"
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="form-file-input"
      />

      <div className="tags-input-container">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add a tag"
          className="tag-input"
        />
        <button onClick={handleAddTag} className="add-tag-btn">
          Add Tag
        </button>
        <div className="tags-display">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="remove-tag-btn"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {isEdit ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
}

export default CarForm;
