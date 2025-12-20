import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { server_url } from "../../utils/url";
import { DynamicIcon } from "lucide-react/dynamic";
import Logo from "../../assets/EMP_logo.png";

interface HeaderProps {
  onHome: () => void;
  onServices: () => void;
  onPricing: () => void;
  onContact: () => void;
}

const Header = ({ onHome, onServices, onPricing, onContact }: HeaderProps) => {
  const [openNav, setOpenNav] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // use Effect
  useEffect(() => {
    const auth = async () => {
      const res = await fetch(`${server_url}/home`, {
        credentials: "include",
      });

      if (res.status == 443) setIsAuth(true);
    };

    auth();
  }, []);

  const navItems = [
    { label: "Home", action: onHome },
    { label: "Services", action: onServices },
    { label: "Pricing", action: onPricing },
    { label: "Contact", action: onContact },
  ];

  // Routes
  const navigate = useNavigate();

  const handleClick = (action: () => void) => {
    action();
    setOpenNav(false);
  };

  // Sign up handler
  const sigupHandler = () => {
    navigate("/auth/sign-up");
  };

  // Log out handler
  const logOutHandler = async () => {
    const res = await fetch(`${server_url}/auth/log-out`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.status == 200) {
      const data = await res.json();
      toast.success(data.message);
    }

    setIsAuth(false);

    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex gap-3 items-center">
        <img src={Logo} className="w-10" />
        <p className="text-white font-semibold hidden sm:block">
          EMP Tech Services
        </p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-white items-center">
        {navItems.map((item, i) => (
          <li
            key={i}
            onClick={item.action}
            className="cursor-pointer hover:text-blue-400"
          >
            {item.label}
          </li>
        ))}

        {isAuth && <Link to={"/transaction"}>Transaction</Link>}

        <button
          onClick={isAuth ? logOutHandler : sigupHandler}
          className={` ${
            isAuth ? "bg-red-700" : "bg-blue-500"
          } py-2 p-4 rounded-full`}
        >
          {isAuth ? "Log out" : "Sign up"}
        </button>
      </ul>

      {/* Mobile Button */}
      <button
        className="sm:hidden text-white"
        onClick={() => setOpenNav(!openNav)}
      >
        <DynamicIcon name={openNav ? "x" : "menu"} size={28} />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {openNav && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute flex flex-col gap-8 top-16 left-0 w-full bg-black px-8 py-10 justify-center items-center"
          >
            <ul className="flex flex-col items-center space-y-5">
              {navItems.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleClick(item.action)}
                  className="text-xl text-center w-full text-white cursor-pointer"
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <ul>
              <Link to={"/transaction"}>Transaction</Link>
            </ul>

            <button
              onClick={isAuth ? logOutHandler : sigupHandler}
              className={` ${
                isAuth ? "bg-red-700" : "bg-blue-500"
              } p-3 w-48 rounded-full `}
            >
              {isAuth ? "Log out" : "Sign up"}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
