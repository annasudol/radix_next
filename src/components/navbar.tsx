import { Link } from '@nextui-org/link';
export const Navbar = () => {
  return (
    <nav className="sticky top-0  flex items-center justify-between container">
      <Link className="w-32 sm:w-52" color="foreground" href="/">
        <img src="/logo.svg" alt="logo" className="w-32 sm:w-52" />
      </Link>

      <div id="connect-btn">
        <radix-connect-button />
      </div>
    </nav>
  );
};
