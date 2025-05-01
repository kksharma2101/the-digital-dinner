import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-7 max-w-xs min-w-80">
          <input
            type="text"
            className="border p-1 rounded-md"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="bg-blue-500 py-1 w-full rounded-md">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
