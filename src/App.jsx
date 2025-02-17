import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);

  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      setResult(cache[input]);
    } else {
      const res = await fetch(
        "https://dummyjson.com/recipes/search?q=" + input
      );
      const data = await res.json();
      setResult(data.recipes);
      setCache({ ...cache, [input]: data.recipes });
    }
  };
  console.log(result);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Api call " + input);
      fetchData();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <>
      <h1>AUTOCOMPLETE SEARCH BOX WITH SUGGESTION</h1>

      <input
        type="text"
        placeholder="Start typing to search..."
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      />
      {show && result.length > 0 && (
        <div className="container">
          {result.map((item) => {
            return <span key={item.id}>{item.name}</span>;
          })}
        </div>
      )}
    </>
  );
};

export default App;
