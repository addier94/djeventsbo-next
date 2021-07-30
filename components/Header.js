import { FaSignOutAlt, FaBars, FaRegWindowClose } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Bo</a>
        </Link>
      </div>

      <Search />

      <nav style={{ display: !toggleNav && "none" }}>
        <ul>
          <li className={styles.nav_list}>
            <ActiveLink children="Events" href="/events" />
          </li>
          {user ? (
            // If logged in
            <>
              <li className={styles.nav_list}>
                <ActiveLink children="Añadir evento" href="/events/add" />
              </li>
              <li className={styles.last_list}>
                <button type="button">
                  Cuenta <BsChevronDown />
                </button>
                <ul className={styles.list_child}>
                  <li>
                    <ActiveLink children="Perfil" href="/account/dashboard" />
                  </li>
                  <li onClick={() => logout()}>
                    <a>
                      <FaSignOutAlt /> Cerrar sesion
                    </a>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li style={{ paddingTop: "1.2rem" }}>
                <Link href="/account/register">
                  <a className="btn-secondary btn-icon">Registrarse</a>
                </Link>
                <Link href="/account/login">
                  <a className="btn-primary">Iniciar Sesion</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {toggleNav ? (
        <FaRegWindowClose
          className={styles.bars}
          onClick={() => setToggleNav(!toggleNav)}
        />
      ) : (
        <FaBars
          className={styles.bars}
          onClick={() => setToggleNav(!toggleNav)}
        />
      )}
    </header>
  );
}

export const ActiveLink = ({ children, href }) => {
  const router = useRouter();

  const active = {
    navActive: router.asPath === href ? "navActive" : "",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <a href={href} onClick={handleClick} className={active.navActive}>
      {children}
    </a>
  );
};
