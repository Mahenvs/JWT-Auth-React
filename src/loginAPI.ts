
export interface formProps {
  username: string,
  pswd: string
}
export const loginApi = async (form: formProps) => {
  const url = "http://localhost:3000/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    alert(`Login success and token is ` + json.token);
  } catch (error) {
    alert("Error" + error)
  }
};

