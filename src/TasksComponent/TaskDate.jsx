const TaskDate = (props) => {
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const year = props.date.getFullYear();

  return (
    <div>
      <div className="fw-light">
        Created at:{" "}
        <div className="fst-italic">
          {day} - {month} - {year}
        </div>
      </div>
    </div>
  );
};

export default TaskDate;
