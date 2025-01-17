import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

const principal = {
  // Defina as propriedades do tema aqui
  borda: "#999",
  texto: "#D2691E",
};

interface Estado {
  id: number;
  nome: string;
  sigla: string;
  // Outras propriedades do estado, se houver
}

export default function Principal() {
  const [sigla, setSigla] = useState("");
  const [nome, setNome] = useState("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [siglaError, setSiglaError] = useState("");
  const [nomeError, setNomeError] = useState("");

  useEffect(() => {
    carregarEstados();
  }, []);

  const carregarEstados = async () => {
    try {
      const response = await fetch("http://localhost:3100/uf");
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error("Erro ao carregar os estados:", error);
    }
  };

  const handleSalvar = () => {
    setSiglaError("");
    setNomeError("");

    if (sigla === "") {
      setSiglaError("A sigla é necessária");
      return;
    }

    if (nome === "") {
      setNomeError("O nome é necessário");
      return;
    }

    const estadoExistente = estados.find((estado) => estado.nome === nome);
    if (estadoExistente) {
      setNomeError("O nome já existe");
      return;
    }

    const novoEstado: Estado = {
      id: estados.length + 1,
      sigla,
      nome,
    };

    setEstados((prevState: Estado[]) => [...prevState, novoEstado]);

    setSigla("");
    setNome("");
  };

  return (
    <ThemeProvider theme={principal}>
      <BoxSld>
        <TitleSld>UF</TitleSld>
        <LabelSld>Sigla</LabelSld>
        <InputSld value={sigla} onChange={(e) => setSigla(e.target.value)} />
        {siglaError && <ErrorSld>{siglaError}</ErrorSld>}
        <LabelSld>Nome</LabelSld>
        <InputSld value={nome} onChange={(e) => setNome(e.target.value)} />
        {nomeError && <ErrorSld>{nomeError}</ErrorSld>}
        <BotaoSalvar onClick={handleSalvar}>Salvar</BotaoSalvar>

        <div>
          {estados.map((estado) => (
            <p key={estado.id}>{`${estado.nome} - ${estado.sigla}`}</p>
          ))}
        </div>
      </BoxSld>
    </ThemeProvider>
  );
}

// Resto do código do componente...

const BoxSld = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  margin: 0px 10px;
  border: 1px solid ${(props) => props.theme.borda};
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 20px;
`;

const TitleSld = styled.h4`
  margin: 0px;
`;

const LabelSld = styled.label`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 2px;
`;

const InputSld = styled.input.attrs({ type: "text" })`
  padding: 8px;
  color: ${(props) => props.theme.texto};
  font-weight: bold;
  border: 1px solid ${(props) => props.theme.borda};
  border-radius: 5px;
`;

const ErrorSld = styled.span`
  color: red;
  font-size: 12px;
`;

const BotaoSalvar = styled.button`
  background-color: orange;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkorange;
  }
`;
