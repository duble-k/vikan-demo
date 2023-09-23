const uploadPdf = async ( formData, token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_serverUrl}/api/upload-pdf`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        return response;
      } catch (error) {
        console.error('Error uploading PDF:', error);
        return ({message: "Server Error Uploading Pdfs"});
      }
}

export default uploadPdf;