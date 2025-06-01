import { Pact, Matchers } from "@pact-foundation/pact";
import path from "path";
import { fetchUser } from "../hooks/useUser";
import { apiClient } from "../lib/api/axios";

describe("User Service", () => {
  const provider = new Pact({
    consumer: "WebApp",
    provider: "UserService",
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "warn",
  });

  beforeAll(async () => {
    await provider.setup();
    apiClient.defaults.baseURL = provider.mockService.baseUrl;
  });

  afterAll(() => provider.finalize());
  afterEach(() => provider.verify());

  it("returns the correct user", async () => {
    await provider.addInteraction({
      state: "[GET] /user/${userId} success",
      uponReceiving: "[GET] /user/${userId}",
      withRequest: {
        method: "GET",
        path: "/user/123",
        headers: {
          Accept: "application/json"
        },
      },
      willRespondWith: {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          id: Matchers.integer(),
          name: Matchers.string(),
          email: Matchers.string(),
        },
      },
    });

    const user = await fetchUser(123);
    expect(user).toEqual({
      id: 123,
      name: "John Doe",
      email: "john@example.com",
    });
  });
});
