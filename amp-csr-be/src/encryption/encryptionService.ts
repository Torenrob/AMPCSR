import * as bcrypt from 'bcrypt';

export default class EncryptionService {
  private static readonly saltOrRounds: number = 10;

  public static async getPassHash(
    userPass: string,
    secretKey: string,
  ): Promise<string> {
    const bcryptPass = userPass + secretKey;
    return await bcrypt.hash(bcryptPass, this.saltOrRounds);
  }

  public static async comparePass(
    userPass: string,
    secretKey: string,
    storedHASH: string,
  ): Promise<boolean> {
    const bcryptPass = userPass + secretKey;
    return await bcrypt.compare(bcryptPass, storedHASH);
  }
}
