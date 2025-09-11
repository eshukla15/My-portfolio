import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      

      {/* Button Group */}
      <div className="flex space-x-6">
        {/* Resume Button */}
        <Link to="/resume">
          <button className="px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300">
            <span className="text-lg font-medium">Resume</span>
          </button>
        </Link>

        {/* Portfolio Button */}
        <Link to="/portfolio">
          <button className="px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300">
            <span className="text-lg font-medium">Portfolio</span>
          </button>
        </Link>
      </div>

      
    </div>
  );
}

export default Landing;
