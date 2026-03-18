"use server";

import { serverClient } from "@/sanity/lib/client";

export async function submitApplication(data) {
  try {
    const {
      fullName,
      email,
      phone,
      portfolioUrl,
      resumeUrl,
      message,
      jobTitle,
    } = data;

    const result = await serverClient.create({
      _type: "jobApplication",
      jobTitle,
      fullName,
      email,
      phone,
      portfolioUrl,
      resumeUrl,
      message,
      status: "new",
      appliedAt: new Date().toISOString(),
    });

    console.log("Application submitted to Sanity:", result._id);

    return { success: true };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
