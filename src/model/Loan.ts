export class Loan {
  private firstName!: string;
  private lastName!: string;
  private institution!: string;
  private amount!: number;

  Loan(
    firstName: string,
    lastName: string,
    institution: string,
    amount: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.institution = institution;
    this.amount = amount;
  }
}
