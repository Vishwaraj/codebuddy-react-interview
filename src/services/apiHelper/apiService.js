import { url } from "../url/url";

export class ServiceAPI {
  static async submitForm(formVal) {
    try {
      const response = await fetch(`${url}/submit`, {
        method: "POST",
        body: JSON.stringify(formVal),
      });

      const data = response.json();

      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async getPosts() {
    try {
      let response = await fetch(`${url}/posts`);

      let data = await response.json();

      if (data?.data) {
        return data?.data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
