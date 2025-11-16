import React from "react";

function Lists({ alldata, loading, onUpdate, onDelete }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {alldata.map((item, index) => (
          <tr key={item.id}>
            {/* Row number ONLY for display */}
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => onUpdate(item)}   // pass the whole item (with id)
              >
                Update
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(item)}   // pass the whole item (with id)
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Lists;
