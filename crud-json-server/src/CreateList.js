import React from "react";

function CreateList({ show, singledata, handleChange, handleClose, handleCreate }) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">New List</h5>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <input
                name="title"
                value={singledata.title}
                onChange={handleChange}
                placeholder="Title"
                className="form-control mb-2"
              />
              <input
                name="author"
                value={singledata.author}
                onChange={handleChange}
                placeholder="Author"
                className="form-control"
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleCreate}>
                Create
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default CreateList;
