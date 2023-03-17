import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../data/constants";

class CryptographyService {
  private readonly saltRounds: number;

  constructor(saltRounds: number = SALT_ROUNDS) {
    this.saltRounds = saltRounds;
  }

  public async encryptData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  public async compareData(
    data: string,
    encryptedData: string
  ): Promise<boolean> {
    const match = await bcrypt.compare(data, encryptedData);
    return match;
  }
}

export default CryptographyService;
