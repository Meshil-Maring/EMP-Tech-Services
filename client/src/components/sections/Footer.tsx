import { motion } from "framer-motion";
import { DynamicIcon } from "lucide-react/dynamic";

import Logo from "../../assets/EPM_logo.png";
import WhatsAppsIcons from "../../assets/icons/WhatsAppIcon";

const footerData = [
  ["Company", "About Us", "Careers", "Blog", "Press Kit"],
  ["Servies", "Web", "Development", "UI/UX Design", "Consulting"],
  ["Resources", "Documentation", "Tutorials", "Support", "Contact"],
  ["Legal", "Terms of Service", "Cookie Policy", "Licenses"],
];

const Footer = () => {
  const goToLink = (
    platform: "whatsapp" | "x" | "facebook" | "linkedin" | "instagram"
  ) => {
    const link = {
      whatsapp: "https://wa.me/9863875081",
      x: "https://x.com/epmtechservice",
      facebook: "https://www.facebook.com/profile.php?id=61585221471079",
      linkedin: "https://www.linkedin.com/company/110253572/admin/dashboard/",
      instagram:
        "https://www.instagram.com/p/DSIifsvE40c/?igsh=MTNpY2l6N3ZpZ2xkYQ==",
    };

    window.open(link[platform], "_blank");
  };

  return (
    <footer className="p-8">
      <div className="flex items-center justify-start">
        <img src={Logo} className="w-12" />
        <h1>EPM Tech Services</h1>
      </div>

      <p className="text-white/60">
        Building exceptional digital experiences for businesses worldwide. Let's
        create something amazing together.
      </p>

      <ul className="flex gap-2 mt-4">
        <motion.li
          onClick={() => goToLink("linkedin")}
          whileHover={{
            y: -2,
            border: "solid 1px",
            borderColor: "#4052D6",
            backgroundImage: "linear-gradient(135deg, #4052D6, #8080FF)",
          }}
          className="bg-white/10 w-fit p-2 rounded-lg border border-white/20 cursor-pointer"
        >
          <DynamicIcon name="linkedin" />
        </motion.li>

        <motion.li
          onClick={() => goToLink("x")}
          whileHover={{
            y: -2,
            border: "solid 1px",
            borderColor: "#4052D6",
            backgroundImage: "linear-gradient(135deg, #4052D6, #8080FF)",
          }}
          className="bg-white/10 w-fit p-2 rounded-lg border border-white/20 cursor-pointer"
        >
          <DynamicIcon name="twitter" />
        </motion.li>

        <motion.li
          onClick={() => goToLink("facebook")}
          whileHover={{
            y: -2,
            border: "solid 1px",
            borderColor: "#4052D6",
            backgroundImage: "linear-gradient(135deg, #4052D6, #8080FF)",
          }}
          className="bg-white/10 w-fit p-2 rounded-lg border border-white/20 cursor-pointer"
        >
          <DynamicIcon name="facebook" />
        </motion.li>

        <motion.li
          onClick={() => goToLink("instagram")}
          whileHover={{
            y: -2,
            border: "solid 1px",
            borderColor: "#4052D6",
            backgroundImage: "linear-gradient(135deg, #4052D6, #8080FF)",
          }}
          className="bg-white/10 w-fit p-2 rounded-lg border border-white/20 cursor-pointer"
        >
          <DynamicIcon name="instagram" />
        </motion.li>

        <motion.li
          onClick={() => goToLink("whatsapp")}
          whileHover={{
            y: -2,
            border: "solid 1px",
            borderColor: "#4052D6",
            backgroundImage: "linear-gradient(135deg, #4052D6, #8080FF)",
          }}
          className="bg-white/10 w-fit p-2 rounded-lg border border-white/20 cursor-pointer"
        >
          <WhatsAppsIcons />
        </motion.li>
      </ul>

      {/* Topical wise link section */}
      <div className="grid gap-8 mt-8 grid-cols-2">
        {footerData.map((value) => (
          <div key={value[0]}>
            <h3 className="font-semibold">{value[0]}</h3>
            <ul className="flex flex-col gap-1">
              {value.slice(1).map((list) => (
                <li
                  key={list}
                  className="text-white/60 text-sm cursor-pointer  hover:text-white transition-colors duration-300"
                >
                  {list}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
