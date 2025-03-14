"use strict";

export async function getPatterns() {
  try {
    const response = await fetch("/patterns", { cache: "no-store" });
    if (!response.ok) throw new Error("Error fetching patterns");
    return await response.json();
  } catch (error) {
    console.error("Error in getPatterns: ", error);
  }
}

export async function getPatternById(id) {
  try {
    const response = await fetch(`/patterns/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Error fetching pattern");
    return await response.json();
  } catch (error) {
    console.error("Error in getPatternById: ", error);
  }
}

export async function updatePattern(id, updatedPatternData) {
  try {
    const patternId = typeof id === "object" ? id.id : id;
    const response = await fetch(`/patterns/${patternId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPatternData),
    });
    if (!response.ok) {
      console.error("Error updating pattern", response.status);
      return;
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating pattern", error);
    throw error;
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
      throw new Error(`Error creating pattern: ${response.status} ${response.statusText}`);
    }
    const created = await response.json();
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
    if (!response.ok) {
      console.error("Error deleting pattern", response.status);
      return;
    }
    getPatterns();
    if (response.status === 204) {
      return null;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("Error deleting pattern", error);
    throw error;
  }
}
