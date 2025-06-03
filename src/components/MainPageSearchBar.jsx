import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Briefcase,
  MapPin,
  ListFilter,
  Search,
} from 'lucide-react';

const categories = ['Engineering', 'Design', 'Marketing', 'Sales', 'Operations'];

const SearchBar = () => {


    const [form, setForm] = useState({ title: '', pincode: '', category: '' });

    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 3, ease: [0.23, 1, 0.32, 1] }}
      className="origin-center w-full max-w-4xl mx-5 sm:mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-full px-6 py-2.5 shadow-xl"
    >
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 border-b-2 border-white/60 pb-2 sm:pb-0 sm:border-b-0 sm:border-r sm:pr-4">
          <Briefcase className="text-white w-5 h-5" />
          <input
            type="text"
            placeholder="Job Title, Keywords or Company"
            value={form.title}
            onChange={handleChange('title')}
            className="bg-transparent focus:outline-none text-white placeholder-white/60 w-full text-sm"
          />
        </div>

        <div className="flex-1 flex items-center gap-3 border-b border-white/20 pb-2 sm:pb-0 sm:border-b-0 sm:border-r sm:pr-4">
          <MapPin className="text-white w-5 h-5" />
          <input
            type="text"
            placeholder="Enter City/Pincode"
            value={form.pincode}
            onChange={handleChange('pincode')}
            className="bg-transparent focus:outline-none text-white placeholder-white/60 w-full text-sm"
          />
        </div>
        
        <div className="relative min-w-[160px] w-full max-w-[180px] flex align-middle">
            <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full space-x-2 cursor-pointer text-sm text-gray-500 hover:text-violet-500"
                >
                <ListFilter className="text-white w-5 h-5" />
                <span className=" text-white placeholder-white/60 overflow-hidden whitespace-nowrap text-ellipsis block max-w-[100px]">
                    {selectedCategory}
                </span>
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {(dropdownOpen) && (
                <motion.div 
                    className="absolute z-10 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 40 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                  {[
                    "All Categories",
                    "Accounting / Finance",
                    "Automotive Jobs",
                    "Customer",
                    "Design",
                    "Development",
                    "Health and Care",
                    "Marketing",
                    "Project Management",
                  ].map((category) => (
                    <div
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 cursor-pointer"
                    >
                      <span>{category}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-white text-black font-medium px-4 py-2 shadow-md hover:bg-gray-200 text-s transition hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400 hover rounded-xl sm:rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Search className="w-5 h-5" />
          Search
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
