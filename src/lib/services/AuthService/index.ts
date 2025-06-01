const AuthService = {
  async login(email: string, password: string) {
    // В реальном приложении здесь был бы fetch к API
    if (email === "test@example.com" && password === "123456") {
      const result = await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
      return { success: result };
    }
    throw new Error("Auth failed");
  },
};

export default AuthService;
