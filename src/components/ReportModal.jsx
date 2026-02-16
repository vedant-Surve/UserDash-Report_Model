import React, { useState } from 'react';

const ReportModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        problem: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save to localStorage can go here
        alert("Report Submitted Successfully!");
        onClose();
    };

    return (
        <div className="report-overlay">
            <div className="report-modal-box">
                <div className="report-header">
                    <h2>Submit your Report</h2>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form-content">
                    <div className="field-group">
                        <label>Enter your name:</label>
                        <input
                            type="text"
                            required
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="field-group">
                        <label>Enter your email address:</label>
                        <input
                            type="email"
                            required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="field-group">
                        <label>Complaint Category:</label>
                        <select
                            className="modal-select"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Water Issues">Water Issues</option>
                            <option value="Bad Road Conditions">Bad Road Conditions</option>
                            <option value="Public Transport">Public Transport</option>
                            <option value="Open Dumping">Open Dumping</option>
                        </select>
                    </div>

                    <div className="field-group">
                        <label>Describe the problem:</label>
                        <textarea
                            rows="3"
                            required
                            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                        />
                    </div>

                    <div className="field-group">
                        <label>Upload a photo:</label>
                        <div className="drop-zone">
                            <span>↓</span>
                        </div>
                    </div>

                    <button type="submit" className="submit-form-btn">Submit Report</button>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;