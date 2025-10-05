import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Route changed, scrolling to top");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll on route change
  }, [pathname]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll on button click
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition"
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default ScrollToTop;
