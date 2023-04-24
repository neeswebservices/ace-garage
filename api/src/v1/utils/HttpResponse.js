import { HttpStatusCode } from "../../../node_modules/axios/index.js";

export class HttpResponse {
  constructor(message, statusCode = HttpStatusCode.Ok, data, status) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = true;
    data && (this.data = data);
    // status && (this.status = status);
  }

  toJson() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      ...(this.data && { data: this.data }),
      ...(this.status && { status: this.status }),
    };
  }
}
