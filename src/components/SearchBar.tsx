// import { useState, useEffect } from "react";
// import { MovieResponse } from "../types/movie.dto";


export interface SearchProps {
  search: string,
  placeHolder: string,
  onChange: Function
}

const SearchBar: React.FunctionComponent<SearchProps> = (props: SearchProps) => {
  const { search, onChange, placeHolder } = props;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can perform any additional actions here before submitting the form
  };

  // console.log("Search:", search);

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] 
          min-w-0 flex-auto rounded-l border border-solid 
          border-white bg-transparent bg-clip-padding 
          px-3 py-[0.25rem] text-base font-normal leading-[1.6] 
          text-white outline-white transition duration-200 
          ease-in-out focus:z-[3] focus:border-white focus:text-white 
          focus:outline-none 
          dark:border-white dark:text-neutral-200 
          dark:placeholder:text-white dark:focus:border-primary"
          onChange={handleSearchChange}
          value={search}
          placeholder={placeHolder}
          aria-label="Search"
          aria-describedby="button-addon1"
        />

        {/* <!--Search button--> */}
        <button
          className="relative z-[2] flex items-center rounded-r px-6 py-2.5 text-xs font-medium uppercase border border-solid 
          border-blue
           leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-white hover:text-black bg-primary"
          type="submit"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
