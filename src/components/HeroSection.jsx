const HeroSection = ({ children }) => {
  return (
    <div className="mx-auto grid w-4/5 justify-center rounded-lg bg-white p-8 shadow-xl shadow-primary/15">
      {children}
    </div>
  );
};

export default HeroSection;
