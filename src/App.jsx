import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "./components/Box";
import Card from "./components/Card";
import { toast, ToastContainer } from "react-toastify";

// const URL = "http://localhost:8080";
const URL = "https://xiv-tech-backend.onrender.com";

function App() {
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);
  const toastId = useRef(null);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleLocation(keyword);
    }
  };

  const handleLocation = (keyword) => {
    if (!keyword || !keyword.trim()) {
      alert("Please enter a city name!");
      return;
    }
    const trimmedKeyword = keyword.trim();

    setLocations((prev) => [
      ...prev,
      { keyword: trimmedKeyword, id: uuidv4() },
    ]);
    setKeyword("");
  };

  const handleRemoveLocation = (id) => {
    setLocations((prev) => prev.filter((item) => item.id != id));
    setData((prev) => prev.filter((item) => item.id != id));
  };

  const handleSubmit = async () => {
    if (locations.length == 0) return;

    try {
      toastId.current = toast("Loading...");

      const parsedLocations = locations.map((location) => location.keyword);

      const res = await fetch(`${URL}/getWeather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locations: parsedLocations }),
      });
      const resData = await res.json();

      if (resData.hasOwnProperty("error")) {
        throw new Error("Invalid! Input");
      }

      setData(
        resData?.data?.map((item, i) => {
          return { ...item, id: locations[i].id };
        })
      );
    } catch (err) {
      console.log(err);
      alert("Invalid input!");
      setData([]);
      setLocations([]);
    } finally {
      toast.dismiss(toastId.current);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="px-5 font-mono max-w-[1000px] mx-auto md-px-0">
        <header className=" text-3xl text-center p-4 pb-8">
          What's Weather Today?
        </header>
        <main>
          <section className="pb-5">
            <label htmlFor="city" className="text-xl block text-center pb-6">
              Enter the City name
            </label>
            <div className="flex items-center justify-center">
              <input
                id="city"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 mx-auto p-2.5"
                placeholder="Enter city name then press Enter..."
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
              />
              {locations && locations.length > 0 ? (
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              ) : null}
            </div>
          </section>
          <section className="flex flex-wrap gap-4 pb-5">
            {locations && locations.length > 0
              ? locations.map((location) => {
                  return (
                    <Box
                      key={location.id}
                      id={location.id}
                      text={location.keyword}
                      handleRemoveLocation={handleRemoveLocation}
                    />
                  );
                })
              : null}
          </section>
          <section className="grid grid-cols-3 gap-5">
            {data && data.length > 0
              ? data.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      country={item?.location?.country}
                      city={item?.location?.name}
                      temp={item?.current?.temp_c}
                      feelTemp={item?.current?.feelslike_c}
                      condition={item?.current?.condition.text}
                      icon={item?.current?.condition?.icon}
                    />
                  );
                })
              : null}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
