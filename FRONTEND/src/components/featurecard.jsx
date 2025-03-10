import React from "react";
import "./featurecard.css";

const FeatureCard = ({ title, description, icon, className, gradient = "purple" }) => {
  return (
    <div className={`feature-card ${gradient} ${className}`}>
      {/* Gradient accent */}
      <div className={`feature-card-accent ${gradient}`}></div>

      <div className="feature-card-header">
        <div className="feature-card-icon">{icon && <div>{icon}</div>}</div>
        <h3 className={`feature-card-title ${gradient}`}>{title}</h3>
      </div>

      <div className="feature-card-content">
        <p className="feature-card-description">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
