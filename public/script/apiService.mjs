"use strict";

export async function getPatterns() {
  try {
    const response = await fetch("/patterns");
    if (!response.ok) throw new Error("Error fetching patterns");
    return await response.json();
  } catch (error) {
    console.error("Error in getPatterns: ", error);
  }
}

export async function createPattern(newPatternData) {
   try {
    const response = await fetch("/patterns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatternData),
    });
    if (!response.ok) {
        console.log("response", response);
      throw new Error(`Error creating pattern: ${response.status} ${response.statusText}`);
    }
    const created = await response.json();
    console.log("created", created);
    return created;
  } catch (error) {
    console.error("Error creating pattern", error);
    throw error;
  }
}


export async function deletePattern(id) {
  try {
    const response = await fetch(`/patterns/${id}`, {
      method: "DELETE",
    });
    console.log("response", response);
    if (!response.ok) {
      console.error("Error deleting pattern", response.status);
      return;
    }
    getPatterns();
    if(response.status === 204) {
      return null;
    }else{
      return await response.json();
    }
  } catch (error) {
    console.error("Error deleting pattern", error);
    throw error;
  }
}
