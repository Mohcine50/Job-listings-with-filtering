import "./styles/App.css";
import bgheadermobile from "./images/bg-header-mobile.svg";
import JobCard from "./components/JobCard";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { removeFilter, filtering } from "./features/jobsSlice";
import bgLapHeader from "./images/bg-header-desktop.svg";

function App() {
  const jobs = useSelector((state) => state.jobs.jobs);
  const filter = useSelector((state) => state.jobs.filter);
  const dispatch = useDispatch();
  const filteredJob = useSelector((state) => state.jobs.filtredJobs);
  useEffect(() => {
    dispatch(filtering());
  }, [filter]);
  const removeFilter_ = (filterValue) => {
    dispatch(removeFilter({ filterValue }));
  };

  const [screenSize, setScreenSize] = useState();

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setScreenSize(window.innerWidth);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='App'>
      <div className='header'>
        <img
          src={window.screen.width <= 375 ? bgheadermobile : bgLapHeader}
          alt=''
        />
        {filter.length > 0 && (
          <div className='filter'>
            {filter.map((f, key) => {
              return (
                <div key={key}>
                  <span>{f}</span>
                  <FontAwesomeIcon
                    style={{
                      backgroundColor: "#5ba4a4",
                      color: "white",
                      fontWeight: 600,
                      fontSize: 17,
                      padding: 5,
                      paddingLeft: 8,
                      paddingRight: 8,
                      cursor: "pointer",
                    }}
                    icon={faXmark}
                    onClick={() => {
                      removeFilter_(f);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='container'>
        <div className='jobs'>
          {filteredJob.map((job, key) => {
            return <JobCard job={job} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
