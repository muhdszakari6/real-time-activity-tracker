const Header = () => {
  return (
    <header className="bg-white border-b px-10 fixed top-0 border-gray-300 min-h-16 shadow-2xs w-full flex gap-4 items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <img
          src="https://www.clickatell.com/favicon-32x32.png?v=46ad0b3e06ddc7c19cd856f1f83e8ebd"
          alt=""
        />
        <h1 className="text-xl">Real Time Activity Tracker</h1>
      </div>
    </header>
  );
};

export default Header;
