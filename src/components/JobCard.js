import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "../styles/jobCard.css";
import { useDispatch } from "react-redux";
import { addFilter } from "../features/jobsSlice";

function JobCard({ job }) {
  const card = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (job.featured === true) {
      card.current.classList.add("card");
    }
  }, [job]);

  const addFilter_ = (filterValue) => {
    dispatch(addFilter({ filterValue: filterValue }));
  };

  const thecnologies = job.languages.concat(job.tools);
  console.log(thecnologies);

  return (
    <div ref={card} className='jobCard'>
      <img src={job.logo} alt='avatar' />
      <div className='large-screen'>
        <div className='details'>
          <div className='skill'>
            <span>{job.company}</span>
            <div>
              {job.new === true && <span>NEW</span>}
              {job.featured === true && <span>Featured</span>}
            </div>
          </div>
          <h1>{job.position}</h1>
          <div className='time'>
            <span>{job.postedAt}</span> . <span>{job.contract}</span> .{" "}
            <span>{job.location}</span>
          </div>
        </div>
        <div className='technologies'>
          <ul>
            {thecnologies.map((language, key) => {
              return (
                <li
                  onClick={() => {
                    addFilter_(language);
                  }}
                  key={key}
                >
                  {language}
                </li>
              );
            })}
          </ul>
          {/*  <ul>
            {job.tools.map((tool, key) => {
              return (
                <li
                  onClick={() => {
                    addFilter_(tool);
                  }}
                  key={key}
                >
                  {tool}
                </li>
              );
            })}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
