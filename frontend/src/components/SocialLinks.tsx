import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

import Contact from "../entities/Contact";
import SocialButton from "./SocialButton";

interface Props {
  contact: Contact;
}

const SocialLinks = ({ contact }: Props) => {
  const iconMapper: Record<string, { icon: JSX.Element; prefix: string }> = {
    phone: { icon: <PhoneIcon />, prefix: "tel:" },
    email: { icon: <EmailIcon />, prefix: "mailto:" },
    instagram: { icon: <FaInstagram />, prefix: "http://instagram.com/_u/" },
    telegram: { icon: <FaTelegram />, prefix: "https://t.me/" },
    whatsapp: { icon: <FaWhatsapp />, prefix: "https://wa.me/" },
    facebook: { icon: <FaFacebook />, prefix: "http://www.facebook.com/" },
  };

  const keysOfProps = Object.keys(iconMapper) as Array<keyof Contact>;

  return (
    <Stack direction={"row"} spacing={6}>
      {keysOfProps.map(
        (key) =>
          contact[key] &&
          iconMapper[key] && (
            <SocialButton
              label={key.toUpperCase()}
              href={`${iconMapper[key]?.prefix}${contact[key]}`}
              key={key}
            >
              {iconMapper[key].icon}
            </SocialButton>
          )
      )}
    </Stack>
  );
};

export default SocialLinks;
