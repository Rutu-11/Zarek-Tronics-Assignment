import { useEffect, useState } from "react";
import "./App.css";
import Routes from "./Routes/Route";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 350,
      duration: 8000,
    });
    AOS.refreshHard();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3700);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="App">
          {/* <div data-aos="fade-down"> */}
          <Routes />

          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default App;
