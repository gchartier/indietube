function HTTPException(error) {
    this.status = error.response.status;
    this.name = "HTTPException";
    this.message = error.message;
}

export default HTTPException;
