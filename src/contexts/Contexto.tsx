import { createContext, useState, useEffect } from "react";
import { UfProps, ContextProps } from "../types";

interface ExtendedContextProps extends ContextProps {
  setUF: (newUfs: UfProps[]) => void;
}

const Contexto = createContext({} as ExtendedContextProps);

function Provider({ children }: any) {
  const [ufs, setUfs] = useState([] as UfProps[]);

  const setUF = (newUfs: UfProps[]) => {
    setUfs(newUfs);
  };

  useEffect(() => {
    async function fetchUfs() {
      try {
        const response = await fetch("http://localhost:3100/uf");
        const data = await response.json();
        setUfs(data);
      } catch (error) {
        console.error("Erro ao buscar os UF's:", error);
      }
    }

    fetchUfs();
  }, []);

  return (
    <Contexto.Provider value={{ ufs, setUF }}>
      {children}
    </Contexto.Provider>
  );
}

export { Contexto, Provider };
