/**
 * Service Layer Facade for Client Enquiries / Quotes
 * Designed to connect to POST /api/enquiries when backend is ready
 */

export const enquiryService = {
  async submitEnquiry(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Validate required fields
        if (!formData.name || !formData.email) {
          resolve({
            success: false,
            message: "Please provide your name and email address."
          });
          return;
        }

        // Return demo response structure as requested
        resolve({
          success: true,
          isDemo: true,
          message: "Demo mode — enquiry will be connected to the backend.",
          dataSubmitted: {
            ...formData,
            submittedAt: new Date().toISOString()
          }
        });
      }, 500);
    });
  }
};
