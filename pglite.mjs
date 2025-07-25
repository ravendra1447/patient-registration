export class PgLite {
  constructor(config) {
    this.db = [];
    console.log("PgLite initialized with", config);
  }
  async exec(sql) {
    console.log("Executing SQL:", sql);
  }
  async run(sql, params) {
    const [name, age, gender] = params;
    this.db.push({
      id: this.db.length + 1,
      name,
      age,
      gender
    });
  }
  async all(query) {
    return { rows: this.db };
  }
}
