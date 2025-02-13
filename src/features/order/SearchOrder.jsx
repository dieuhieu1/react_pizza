import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmitSearch}>
      <input
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-100 rounded-full px-4 py-2  font-normal w-28 text-sm placeholder:text-stone-400
        sm:focus:w-72 transition-all duration-300 md:w-64 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
