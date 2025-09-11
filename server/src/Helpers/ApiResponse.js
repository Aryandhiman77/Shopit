class ApiResponse {
  constructor(statusCode, data = null, message = "Something went wrong") {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
