export class ErrorResponse {
  private _messages: string[] = [];

  addMessage(message: string) {
    this._messages.push(message);
  }

  get messages(): string[] {
    return this._messages;
  }
}
