export class Loan {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public institution!: string;
  public amount!: number;

  Loan(
    id: number,
    firstName: string,
    lastName: string,
    institution: string,
    amount: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.institution = institution;
    this.amount = amount;
  }
}
