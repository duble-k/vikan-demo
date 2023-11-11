const fetchPdf = async (name, pdfName) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/get-pdf`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfName, name }), // Send the PDF name in the request body
      }
    );

    return response;
  } catch (err) {
    console.log(err);
    return { message: "Error occured getting the pdf" };
  }
};

export default fetchPdf;
