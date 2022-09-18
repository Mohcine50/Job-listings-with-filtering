import { createSlice } from "@reduxjs/toolkit";
import { jobs } from "../data";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs,
    filter: [],
    filtredJobs: jobs,
  },
  reducers: {
    addFilter: (state, actions) => {
      const { filterValue } = actions.payload;
      if (state.filter.includes(filterValue) === false) {
        state.filter.push(filterValue);
      }
    },
    removeFilter: (state, actions) => {
      const { filterValue } = actions.payload;
      state.filter = state.filter.filter((f) => f !== filterValue);
    },
    filtering: (state) => {
      if (state.filter.length === 0) {
        state.filtredJobs = state.jobs;
      } else if (state.filter.length > 0) {
        state.filtredJobs = [];
        let i = 0;
        state.filter.forEach((f) => {
          state.jobs.forEach((job) => {
            if (job.languages.includes(f) || job.tools.includes(f)) {
              state.filtredJobs.forEach((filtredJob) => {
                if (filtredJob.id === job.id) {
                  i++;
                }
              });
              if (i === 0) {
                state.filtredJobs.push(job);
              }
            }
          });
        });
        console.log(state.filtredJobs);
      }
    },
  },
});

export const { addFilter, removeFilter, filtering } = jobsSlice.actions;

export default jobsSlice.reducer;
