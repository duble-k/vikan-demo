const fetchPdf = async (pdfName, token) => {
    try 
    {
        const response = await fetch(`${process.env.REACT_APP_serverUrl}/api/get-pdf`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pdfName }), // Send the PDF name in the request body
        });

        return response;
    }
    catch(err)
    {
        console.log(err);
        return ({message: "Error occured getting the pdf"});
    }  
};

export default fetchPdf;