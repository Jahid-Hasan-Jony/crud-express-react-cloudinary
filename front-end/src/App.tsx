import "./App.css";

function App() {
  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  };

  const changeHandle = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      {/* <ImageUploadForm /> */}

      <form onSubmit={formHandler}>
        <input className="border" name="fname" type="text" />
        <input
          className="border"
          onChange={changeHandle}
          name="lname"
          type="text"
        />
        <input type="file" accept=".png,.jpd" name="file" />
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
