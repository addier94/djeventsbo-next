import { FaSignOutAlt, FaBars, FaRegWindowClose } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { useContext, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [toggleNav, setToggleNav] = useState(false);

  const active = (currentRoute) => {
    return router.pathname === currentRoute ? "navActive" : "";
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Bo</a>
        </Link>
      </div>

      <Search />

      <nav style={{ display: toggleNav && "none" }}>
        <ul>
          <li className={styles.nav_list}>
            <Link href="/events">
              <a className={active("/events")}>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li className={styles.nav_list}>
                <Link href="/events/add">
                  <a className={active("/events/add")}>Añadir evento</a>
                </Link>
              </li>
              <li className={styles.last_list}>
                <button type="button">
                  Cuenta <BsChevronDown />
                </button>
                <ul className={styles.list_child}>
                  <li>
                    <Link href="/account/dashboard">
                      <a>Perfil</a>
                    </Link>
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
              <li style={{ "padding-top": "1.2rem" }}>
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
        <FaBars
          className={styles.bars}
          onClick={() => setToggleNav(!toggleNav)}
        />
      ) : (
        <FaRegWindowClose
          className={styles.bars}
          onClick={() => setToggleNav(!toggleNav)}
        />
      )}
    </header>
  );
}
