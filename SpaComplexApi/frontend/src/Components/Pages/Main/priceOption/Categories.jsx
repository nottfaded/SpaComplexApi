import React from "react";

export default function Categories({ categories, chooseCategory }) {
  return (
    <div className="categories montserrat font-size-18">
      {categories.map((el) => (
        <div
          key={el.key}
          onClick={() => {
            chooseCategory(el.key);
            el.active = true;
          }}
          className={el.active ? "active" : ""}
        >
          {el.value}
        </div>
      ))}
    </div>
  );
}
