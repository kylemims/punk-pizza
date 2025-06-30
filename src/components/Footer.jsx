export const Footer = () => {
  return (
    <footer className="bg-redriot text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="font-luckiest text-lg">
          © {new Date().getFullYear()} Jake N' Bakes Punk Rock Pizza
        </p>
        <p className="text-sm mt-2 md:mt-0">
          Built by{" "}
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noreferrer"
            className="hover:text-limepunk underline">
            Kyle Mims
          </a>
        </p>
      </div>
    </footer>
  );
};
