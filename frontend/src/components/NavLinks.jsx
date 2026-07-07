import navLinks from "../utils/navLinks";

function NavLinks() {
  return (
    <>
      {navLinks.map((link) => (
        <a key={link} href="#">
          {link}
        </a>
      ))}
    </>
  );
}

export default NavLinks;