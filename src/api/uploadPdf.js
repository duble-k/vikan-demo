const uploadPdf = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/upload-pdf`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    return response;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return { message: "Server Error Uploading Pdfs" };
  }
};

export default uploadPdf;
