import React from "react";
import Navbar from "./Navbar"
import ztm_img from "./img/ztm_img.png";
import ts from './img/theme selection.png'
import cts from './img/change task status.png'
import sdd from './img/set due date.png'
import crt from './img/create task.png'
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="pt-8 mt-12 md:pt-8 mt-8">
        <h1 className="text-2xl font-medium text-center italic">
          Zidio Task Management 
        </h1>
      </div>
      <div className="pt-4 mt-4 flex items-center justify-center">
        <div class="max-w-md mx-auto overflow-hidden gap-4 md:max-w-3xl">
          <div class="md:flex">
            <div class="md:shrink-0">
              <img
                class="h-48 w-full md:h-full md:w-52"
                src={ztm_img}
                alt="welcome pic"
              />
            </div>
            <div class="p-8">
              <p className="text-base text-justify">
                Zidio Task Management is designed to simplify task organization
                and boost productivity. Users can easily create, edit, and
                delete tasks while tracking their progress with status updates
                such as Pending, In Progress, and Completed. With features like
                due dates, priority levels, and categorization, managing tasks
                becomes more efficient. The system also includes a user-friendly
                interface with a structured task list, search and filter
                options, and an optional dark mode for better accessibility.
                Whether for personal use or team collaboration, our platform
                ensures seamless task management to help users stay organized
                and focused.
              </p>
              <NavLink to={"/register"}>
              <button className="btn btn-primary w-50 hover:bg-primary mt-4">
                Get Started <ArrowForwardIcon/>
              </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 mt-12 md:pt-8 mt-8">
        <h1 className="text-2xl font-medium text-center italic">Features</h1>
      </div>

      <div className="flex items-center justify-center grid grid-cols-2 md:grid-cols-4 gap-2 m-4">
        <div className="card bg-base-100 w-full">
          <figure className="px-10 pt-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <img
              src={crt}
              alt="new task creation"
              class="rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-xl not-italic">New Task Creation</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full">
          <figure className="px-10 pt-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <img
              src={sdd}
              alt="set due date"
              class="rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-xl not-italic">Set Due Date and Priority</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full">
          <figure className="px-10 pt-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <img
              src={cts}
              alt="change task status"
              class="rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-xl not-italic">Change Task Status</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full">
          <figure className="px-10 pt-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <img
              src={ts}
              alt="theme selection"
              class="rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-xl not-italic">Theme Selection</h2>
          </div>
        </div>
      </div>

      <footer className="h-12 bg-transparent mt-12">
        <p className="text-center p-2 text-xl italic">
          © Copyrights-2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
