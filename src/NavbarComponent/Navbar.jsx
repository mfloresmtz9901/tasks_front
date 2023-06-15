const Navbar = (props) => {
  const closeSessionHandler = () => {
    props.onCloseSession();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Tasks List</a>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-secondary me-3"
            onClick={closeSessionHandler}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
