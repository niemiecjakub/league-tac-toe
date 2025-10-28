import { useEffect, useState } from "react";

function RedirectPopup() {
  const [countdown, setCountdown] = useState(3);
  const newSiteUrl = "leaguetactoe.com";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = "https://" + newSiteUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-league-blue-600 bg-opacity-95 border-solid-1px">
      <div className="bg-league-gold-300 rounded-lg w-11/12 max-w-md mx-4 overflow-hidden">
        <div className="bg-league-blue-700 py-4 px-6">
          <h2 className="text-xl md:text-2xl text-league-gold-400 font-black font-leagueheavy text-center">
            League Tac Toe has been moved to a new site.
          </h2>
        </div>
        <div className="p-6 md:p-8 text-center">
          <p className="text-base md:text-lg mb-4 text-4xl">
            Check out the updated version at:
          </p>
          <a
            href={newSiteUrl}
            className="text-xl md:text-2xl inline-block bg-league-gold-400 w-full rounded-lg py-3 font-bold text-sm md:text-md  mb-6 break-all transition-colors"
          >
            {newSiteUrl}
          </a>
          <div className="bg-league-blue-700 rounded-lg py-4 px-6">
            <p className="text-white text-base text-sm md:text-md">
              Redirecting in <span>{countdown}</span> second
              {countdown !== 1 ? "s" : ""}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedirectPopup;
