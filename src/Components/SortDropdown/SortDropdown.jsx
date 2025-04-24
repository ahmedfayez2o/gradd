import React from "react";
import "./SortDropdown.css";

const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div className="sort-dropdown">
      <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sort By</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
