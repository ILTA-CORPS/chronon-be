export class ApiResponse<T> {
  constructor(
    public message: string,
    public data?: T,
    public meta?: object,
  ) {}

  /**
   * Add additional data to the response meta.
   *
   * @param data
   */
  additionalData(data: object) {
    this.meta = data;
  }
}
