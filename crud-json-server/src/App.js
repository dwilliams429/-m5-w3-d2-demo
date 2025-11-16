import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

const API_URL = "http://localhost:5001/posts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: { id: "", title: "", author: "" },
      showCreate: false,
      showUpdate: false,
      showDelete: false,
    };
  }

  componentDidMount() {
    this.getLists();
  }

  // GET ALL BOOKS
  getLists = () => {
    this.setState({ loading: true });

    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          alldata: result,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
        alert("Failed to fetch lists. Make sure json-server is running on http://localhost:5001/posts");
      });
  };

  // HANDLE INPUT CHANGE (used by all modals)
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState((prev) => ({
      singledata: {
        ...prev.singledata,
        [name]: value,
      },
    }));
  };

  // ===== CREATE =====
  openCreate = () => {
    this.setState({
      showCreate: true,
      singledata: { id: "", title: "", author: "" },
    });
  };

  closeCreate = () => {
    this.setState({
      showCreate: false,
      singledata: { id: "", title: "", author: "" },
    });
  };

  createList = () => {
    const { title, author } = this.state.singledata;

    if (!title.trim() || !author.trim()) {
      alert("Please enter both title and author.");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Create failed");
        return res.json();
      })
      .then(() => {
        this.closeCreate();
        this.getLists();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create list.");
      });
  };

  // ===== UPDATE =====
  // item comes from Lists.js and includes the real id from json-server
  openUpdate = (item) => {
    this.setState({
      showUpdate: true,
      singledata: { ...item }, // keep its real id
    });
  };

  closeUpdate = () => {
    this.setState({
      showUpdate: false,
      singledata: { id: "", title: "", author: "" },
    });
  };

  updateList = () => {
    const { id, title, author } = this.state.singledata;

    if (!title.trim() || !author.trim()) {
      alert("Please enter both title and author.");
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, author }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        this.closeUpdate();
        this.getLists();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update list.");
      });
  };

  // ===== DELETE =====
  openDelete = (item) => {
    this.setState({
      showDelete: true,
      singledata: { ...item }, // keep its real id
    });
  };

  closeDelete = () => {
    this.setState({
      showDelete: false,
      singledata: { id: "", title: "", author: "" },
    });
  };

  deleteList = () => {
    const { id } = this.state.singledata;

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      })
      .then(() => {
        this.closeDelete();
        this.getLists();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete list.");
      });
  };

  // ===== RENDER =====
  render() {
    const {
      loading,
      alldata,
      singledata,
      showCreate,
      showUpdate,
      showDelete,
    } = this.state;

    return (
      <div className="container mt-4">
        <h3>Book List (CRUD with JSON Server)</h3>

        <button className="btn btn-primary me-2" onClick={this.getLists}>
          Get Lists
        </button>

        <button className="btn btn-primary" onClick={this.openCreate}>
          Create New List
        </button>

        <hr />

        <Lists
          alldata={alldata}
          loading={loading}
          onUpdate={this.openUpdate}
          onDelete={this.openDelete}
        />

        {/* CREATE MODAL */}
        <CreateList
          show={showCreate}
          singledata={singledata}
          handleChange={this.handleChange}
          handleClose={this.closeCreate}
          handleCreate={this.createList}
        />

        {/* UPDATE MODAL */}
        {showUpdate && (
          <>
            <div className="modal-backdrop show"></div>
            <div className="modal d-block">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update List</h5>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={this.closeUpdate}
                    >
                      Close
                    </button>
                  </div>

                  <div className="modal-body">
                    <input
                      name="title"
                      value={singledata.title}
                      onChange={this.handleChange}
                      className="form-control mb-2"
                    />
                    <input
                      name="author"
                      value={singledata.author}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={this.closeUpdate}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={this.updateList}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DELETE MODAL */}
        {showDelete && (
          <>
            <div className="modal-backdrop show"></div>
            <div className="modal d-block">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete List</h5>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={this.closeDelete}
                    >
                      Close
                    </button>
                  </div>

                  <div className="modal-body">
                    <input
                      value={singledata.title}
                      className="form-control mb-2"
                      disabled
                    />
                    <input
                      value={singledata.author}
                      className="form-control"
                      disabled
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={this.closeDelete}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.deleteList}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
