function Error404() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card w-25 shadow-lg h-25 d-flex flex-column justify-content-center align-items-center">
        <p className="card-title fs-1 fw-bold">Error 404</p>
        <p className="card-text fs-2">"404 Error: Page Not Found"</p>
      </div>
    </div>
  );
}

export default Error404;
