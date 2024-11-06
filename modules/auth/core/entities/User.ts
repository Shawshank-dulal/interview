export class User {
  constructor(
    public readonly uid: string,
    public email: string,
    public displayName: string | null,
    public photoURL: string | null,
    public emailVerified: boolean
  ) {}

  static fromFirebase(firebaseUser: any): User {
    return new User(
      firebaseUser.uid,
      firebaseUser.email,
      firebaseUser.displayName,
      firebaseUser.photoURL,
      firebaseUser.emailVerified
    );
  }
}