export class User {
  private readonly id: string;
  private readonly email: string;
  private readonly passwordHash: string;

  constructor(params: { id: string; email: string; passwordHash: string }) {
    this.id = params.id;
    this.email = params.email;
    this.passwordHash = params.passwordHash;
  }

  getId(): string { return this.id; }
  getEmail(): string { return this.email; }
  getPasswordHash(): string { return this.passwordHash; }
}