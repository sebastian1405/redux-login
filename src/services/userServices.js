export const loginUser = async () => {
  try {
    const resp = await fetch(
      "https://tiendavirtualmern.herokuapp.com/api/users/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const registerUser = async () => {
  try {
    const resp = await fetch(
      "https://tiendavirtualmern.herokuapp.com/api/users",
      {
        method: "POST",
        body: JSON.stringify({
          name: nombre,
          email: email,
          password: password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
