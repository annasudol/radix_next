export const Navbar = () => {
  return (
    <nav className="sticky top-0 sm:static bg-base-200 sm:bg-transparent flex items-center justify-between w-full !h-[64px] !min-h-[64px]">
      <div className="flex h-full">
        <img src="/public/vite.svg" alt="logo" className='w-32 sm:w-52' />
      </div>
      <div className="flex items-center content-center h-full relative">
        <div className="flex pr-4">
          <radix-connect-button></radix-connect-button>
        </div>
      </div>
    </nav>
  );
};
