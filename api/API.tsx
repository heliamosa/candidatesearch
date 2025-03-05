export const getCandidate = async () => {
  try {
    const response = await fetch("https://api.github.com/users?per_page=1", {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data[0]; // Return first user from the API response
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return null; // Return null if there’s an error
  }
};
