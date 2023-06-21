import { useEffect, useState } from "react";

const TaskFilter = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState("ascending");

  const changeTextHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const changeStatusHandler = (event) => {
    setSelectedStatus(event.target.value);
  };

  const changeDateHandler = (event) => {
    setSelectedOrder(event.target.value);
  };

  const filterData = () => {
    const filters = {
      content: enteredText,
      status: selectedStatus,
      order: selectedOrder,
    };
    props.onSetFilter(filters);
  };

  useEffect(() => {
    filterData();
  }, [enteredText, selectedStatus, selectedOrder]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="searchFilter" className="form-label">
            Search for content
          </label>
          <input
            type="text"
            className="form-control"
            id="searchFilter"
            value={enteredText}
            onChange={changeTextHandler}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={selectedStatus}
            onChange={changeStatusHandler}
          >
            <option value="all">Show all</option>
            <option value="pending">Pending</option>
            <option value="on process">On Process</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>

      <div className="card-body">
        <div className="mb-2">
          <label className="form-label">Order By Date</label>
          <select
            className="form-select"
            value={selectedOrder}
            onChange={changeDateHandler}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
