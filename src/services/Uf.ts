import api from "./api";
import { UfProps } from "../types";

class Uf {
  async list(): Promise<UfProps[]> {
    const { data } = await api.get("/uf");
    return data;
  }

  async create(uf:UfProps): Promise<any> {
    const { data } = await api.post("/uf",uf);
    return data;
  }
}

const uf = new Uf();
export default uf;
