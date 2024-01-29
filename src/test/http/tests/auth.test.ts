import { describe, it, expect } from "bun:test";

import { testApp } from "../test-app";

interface SignUpResponse {
  id: string;
  name: string;
  email: string;
}

describe("Authentication/Authorization tests", async () => {
  it("Should sign-up, sign-in and be able to access authenticated routes", async () => {
    const email = "email@email.com";
    const password = "secret";
    const name = "John Doe";

    const signUpResponse = await testApp.handle(
      new Request({
        url: "http://localhost/user/sign-up",
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    expect(signUpResponse.ok).toBeTrue();
    const signUpBody = (await signUpResponse.json()) as SignUpResponse;
    expect(signUpBody.name).toBe(name);
    expect(signUpBody.email).toBe(email);

    const signInResponse = await testApp.handle(
      new Request({
        url: "http://localhost/user/sign-in",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
    );
    expect(signInResponse.ok).toBeTrue();
    const authToken = await signInResponse.text();

    const borrowPhysicalBookResponse = await testApp.handle(
      new Request({
        url: "http://localhost/physical-book/borrow",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          physicalBookId: "aaaa",
        }),
      })
    );
    // Checks if user is authenticated. If it's not, the API will return whether 403 or 401 status code
    expect(
      borrowPhysicalBookResponse.status === 403 ||
        borrowPhysicalBookResponse.status === 401
    ).toBeFalse();
  });
});
