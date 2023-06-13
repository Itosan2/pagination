import React from "react";

const RenderData = (currentItems, data) => {
  return (
    <ul style={{ listStyleType: "none" }}>
      {data.map((todo, index) => {
        return (
          <li key={index}>
            {todo.id} - {todo.title}
          </li>
        );
      })}
    </ul>
  );
};

export default RenderData;
