import { useState } from "react";
import { useRouter } from "next/router";
import style from "@/styles/Search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <div className={style.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Buscar Eventos..."
        />
      </form>
    </div>
  );
}
